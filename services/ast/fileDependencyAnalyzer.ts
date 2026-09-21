import { WorkspaceFile } from "../../types";

export interface DependencyNode {
  id: string; // relative path e.g. "src/App.tsx"
  label: string; // file name e.g. "App.tsx"
  path: string;
  category: "component" | "service" | "agent" | "telemetry" | "type" | "subwidget" | "config";
  pole: "alpha" | "beta" | "gamma" | "delta" | "telemetry";
  sizeBytes: number;
  linesCount: number;
  imports: string[]; // paths of files it imports
  importedBy: string[]; // paths of files that import it
  exportsList: string[]; // exported symbols
  externalImports: string[]; // e.g. "react", "lucide-react", "motion/react"
  hasCircularDependency: boolean;
  circularPath?: string[];
  x: number;
  y: number;
  vx?: number;
  vy?: number;
}

export interface DependencyLink {
  source: string; // node id
  target: string; // node id
  isCircular: boolean;
  isExternal?: boolean;
}

export interface GraphMetrics {
  totalModules: number;
  totalConnections: number;
  componentsCount: number;
  servicesCount: number;
  typesCount: number;
  telemetryCount: number;
  circularCyclesCount: number;
  isolatedModulesCount: number;
  maxDependencyDepth: number;
  coherenceIndex: number; // Ξ ≡ 1.000
}

export interface DependencyGraphData {
  nodes: DependencyNode[];
  links: DependencyLink[];
  metrics: GraphMetrics;
  circularChains: string[][];
}

class FileDependencyAnalyzer {
  public analyzeWorkspace(files: WorkspaceFile[]): DependencyGraphData {
    const nodesMap = new Map<string, DependencyNode>();
    const validFilePaths = new Set(files.map((f) => this.normalizePath(f.path)));

    // 1. First pass: Create nodes and parse imports/exports
    for (const file of files) {
      const normPath = this.normalizePath(file.path);
      const fileName = normPath.split("/").pop() || normPath;
      const content = file.content || "";
      const lines = content.split("\n").length;

      const { localImports, externalImports, exportsList } = this.parseImportsAndExports(
        normPath,
        content,
        validFilePaths
      );

      const category = this.categorizeFile(normPath);
      const pole = this.determinePole(category, normPath);

      nodesMap.set(normPath, {
        id: normPath,
        label: fileName,
        path: normPath,
        category,
        pole,
        sizeBytes: content.length,
        linesCount: lines,
        imports: localImports,
        importedBy: [],
        exportsList,
        externalImports,
        hasCircularDependency: false,
        x: 0,
        y: 0,
      });
    }

    // 2. Second pass: Compute inverted index (importedBy)
    const links: DependencyLink[] = [];
    nodesMap.forEach((node) => {
      for (const targetPath of node.imports) {
        const targetNode = nodesMap.get(targetPath);
        if (targetNode) {
          targetNode.importedBy.push(node.id);
          links.push({
            source: node.id,
            target: targetPath,
            isCircular: false,
          });
        }
      }
    });

    // 3. Third pass: Detect circular dependency cycles using DFS
    const circularChains = this.findCircularDependencies(nodesMap);
    const circularEdges = new Set<string>();

    for (const cycle of circularChains) {
      for (let i = 0; i < cycle.length; i++) {
        const curr = cycle[i];
        const next = cycle[(i + 1) % cycle.length];
        circularEdges.add(`${curr}->${next}`);
        const node = nodesMap.get(curr);
        if (node) {
          node.hasCircularDependency = true;
          node.circularPath = cycle;
        }
      }
    }

    // Flag circular links
    for (const link of links) {
      if (circularEdges.has(`${link.source}->${link.target}`)) {
        link.isCircular = true;
      }
    }

    // 4. Fourth pass: Layout algorithm (Hierarchical / Radial Force Positioning)
    const nodes = Array.from(nodesMap.values());
    this.calculateTopologicalPositions(nodes);

    // 5. Fifth pass: Calculate global architectural metrics
    const metrics = this.calculateMetrics(nodes, links, circularChains);

    return {
      nodes,
      links,
      metrics,
      circularChains,
    };
  }

  private normalizePath(p: string): string {
    let clean = p.replace(/\\/g, "/");
    if (clean.startsWith("/")) clean = clean.slice(1);
    return clean;
  }

  private parseImportsAndExports(
    currentFilePath: string,
    content: string,
    validPaths: Set<string>
  ): { localImports: string[]; externalImports: string[]; exportsList: string[] } {
    const localImports: string[] = [];
    const externalImports: string[] = [];
    const exportsList: string[] = [];

    const currentDir = currentFilePath.includes("/")
      ? currentFilePath.substring(0, currentFilePath.lastIndexOf("/"))
      : "";

    // Regex for ES Imports: import ... from '...' or import '...'
    const importRegex = /(?:import\s+(?:[\w\s{},*]+from\s+)?['"]([^'"]+)['"])|(?:require\(['"]([^'"]+)['"]\))/g;
    let match: RegExpExecArray | null;

    while ((match = importRegex.exec(content)) !== null) {
      const rawSpecifier = match[1] || match[2];
      if (!rawSpecifier) continue;

      if (rawSpecifier.startsWith(".")) {
        // Resolve relative import to actual workspace path
        const resolved = this.resolveRelativeImport(currentDir, rawSpecifier, validPaths);
        if (resolved && !localImports.includes(resolved)) {
          localImports.push(resolved);
        }
      } else {
        if (!externalImports.includes(rawSpecifier)) {
          externalImports.push(rawSpecifier);
        }
      }
    }

    // Regex for Named / Default exports: export const ..., export function ..., export default ...
    const exportRegex = /export\s+(?:default\s+)?(?:const|function|class|interface|type|enum|let|var)\s+([a-zA-Z0-9_$]+)/g;
    while ((match = exportRegex.exec(content)) !== null) {
      if (match[1] && !exportsList.includes(match[1])) {
        exportsList.push(match[1]);
      }
    }

    return { localImports, externalImports, exportsList };
  }

  private resolveRelativeImport(
    baseDir: string,
    relPath: string,
    validPaths: Set<string>
  ): string | null {
    const parts = (baseDir ? baseDir.split("/") : []).concat(relPath.split("/"));
    const resolvedParts: string[] = [];

    for (const part of parts) {
      if (part === "" || part === ".") continue;
      if (part === "..") {
        resolvedParts.pop();
      } else {
        resolvedParts.push(part);
      }
    }

    const candidateBase = resolvedParts.join("/");
    const extensions = ["", ".ts", ".tsx", ".js", ".jsx", ".json", "/index.ts", "/index.tsx"];

    for (const ext of extensions) {
      const candidate = `${candidateBase}${ext}`;
      if (validPaths.has(candidate)) {
        return candidate;
      }
    }

    return candidateBase;
  }

  private categorizeFile(path: string): DependencyNode["category"] {
    if (path.includes("components/sub/")) return "subwidget";
    if (path.includes("components/")) return "component";
    if (path.includes("services/agents/") || path.includes("agent/")) return "agent";
    if (path.includes("services/")) return "service";
    if (path.includes("telemetry/") || path.includes("cosmic/")) return "telemetry";
    if (path.endsWith("types.ts") || path.includes("types/")) return "type";
    if (path.endsWith(".json") || path.endsWith(".config.ts")) return "config";
    return "component";
  }

  private determinePole(category: DependencyNode["category"], path: string): DependencyNode["pole"] {
    if (path.includes("quantum") || path.includes("ast") || path.includes("math") || category === "type") {
      return "alpha";
    }
    if (path.includes("sentinel") || path.includes("security") || path.includes("vault")) {
      return "beta";
    }
    if (path.includes("agent") || path.includes("aiStudio") || path.includes("service")) {
      return "gamma";
    }
    if (path.includes("telemetry") || path.includes("hardware")) {
      return "telemetry";
    }
    return "delta";
  }

  private findCircularDependencies(nodesMap: Map<string, DependencyNode>): string[][] {
    const cycles: string[][] = [];
    const visited = new Set<string>();
    const recursionStack = new Set<string>();
    const pathStack: string[] = [];

    const dfs = (nodeId: string) => {
      visited.add(nodeId);
      recursionStack.add(nodeId);
      pathStack.push(nodeId);

      const node = nodesMap.get(nodeId);
      if (node) {
        for (const neighbor of node.imports) {
          if (!visited.has(neighbor)) {
            dfs(neighbor);
          } else if (recursionStack.has(neighbor)) {
            const cycleStartIndex = pathStack.indexOf(neighbor);
            if (cycleStartIndex !== -1) {
              const cycle = pathStack.slice(cycleStartIndex);
              cycles.push(cycle);
            }
          }
        }
      }

      pathStack.pop();
      recursionStack.delete(nodeId);
    };

    for (const nodeId of nodesMap.keys()) {
      if (!visited.has(nodeId)) {
        dfs(nodeId);
      }
    }

    return cycles;
  }

  private calculateTopologicalPositions(nodes: DependencyNode[]) {
    // Cluster nodes by pole into distinct visual quadrants/concentric rings
    const poleAngles: Record<DependencyNode["pole"], { baseAngle: number; radius: number }> = {
      alpha: { baseAngle: Math.PI * 0.25, radius: 240 },
      beta: { baseAngle: Math.PI * 0.75, radius: 280 },
      gamma: { baseAngle: Math.PI * 1.25, radius: 320 },
      delta: { baseAngle: Math.PI * 1.75, radius: 200 },
      telemetry: { baseAngle: 0, radius: 360 },
    };

    const poleCounts: Record<string, number> = { alpha: 0, beta: 0, gamma: 0, delta: 0, telemetry: 0 };
    const poleTotals: Record<string, number> = { alpha: 0, beta: 0, gamma: 0, delta: 0, telemetry: 0 };

    for (const node of nodes) {
      poleTotals[node.pole] = (poleTotals[node.pole] || 0) + 1;
    }

    const centerX = 500;
    const centerY = 380;

    for (const node of nodes) {
      const pole = node.pole;
      const count = poleCounts[pole] || 0;
      const total = Math.max(poleTotals[pole], 1);
      poleCounts[pole] = count + 1;

      const angleSpread = Math.PI * 0.65;
      const angleOffset = (count / total - 0.5) * angleSpread;
      const finalAngle = poleAngles[pole].baseAngle + angleOffset;
      const r = poleAngles[pole].radius + (count % 3) * 35;

      node.x = centerX + Math.cos(finalAngle) * r;
      node.y = centerY + Math.sin(finalAngle) * r;
    }
  }

  private calculateMetrics(
    nodes: DependencyNode[],
    links: DependencyLink[],
    circularChains: string[][]
  ): GraphMetrics {
    const componentsCount = nodes.filter((n) => n.category === "component" || n.category === "subwidget").length;
    const servicesCount = nodes.filter((n) => n.category === "service" || n.category === "agent").length;
    const typesCount = nodes.filter((n) => n.category === "type").length;
    const telemetryCount = nodes.filter((n) => n.category === "telemetry").length;
    const isolatedModulesCount = nodes.filter((n) => n.imports.length === 0 && n.importedBy.length === 0).length;

    let maxDepth = 0;
    for (const node of nodes) {
      maxDepth = Math.max(maxDepth, node.imports.length);
    }

    return {
      totalModules: nodes.length,
      totalConnections: links.length,
      componentsCount,
      servicesCount,
      typesCount,
      telemetryCount,
      circularCyclesCount: circularChains.length,
      isolatedModulesCount,
      maxDependencyDepth: maxDepth,
      coherenceIndex: circularChains.length === 0 ? 1.0 : Math.max(0.85, 1.0 - circularChains.length * 0.05),
    };
  }
}

export const fileDependencyAnalyzer = new FileDependencyAnalyzer();
