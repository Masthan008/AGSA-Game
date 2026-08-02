import { AnimationFrame, NodePosition, EdgeConnection } from '../types';

export function generateDijkstraFrames(): AnimationFrame[] {
  const graph = {
    nodes: [
      { id: 'A', x: 80, y: 120 },
      { id: 'B', x: 240, y: 50 },
      { id: 'C', x: 240, y: 190 },
      { id: 'D', x: 400, y: 80 },
      { id: 'E', x: 400, y: 220 }
    ],
    edges: [
      { from: 'A', to: 'B', weight: 4 },
      { from: 'A', to: 'C', weight: 2 },
      { from: 'B', to: 'C', weight: 1 },
      { from: 'B', to: 'D', weight: 5 },
      { from: 'C', to: 'D', weight: 8 },
      { from: 'C', to: 'E', weight: 10 },
      { from: 'D', to: 'E', weight: 2 }
    ]
  };

  const frames: AnimationFrame[] = [];
  const dist: Record<string, number> = {};
  const visited: Set<string> = new Set();
  const prev: Record<string, string | null> = {};

  graph.nodes.forEach(n => {
    dist[n.id] = n.id === 'A' ? 0 : Infinity;
    prev[n.id] = null;
  });

  function makeFrame(title: string, action: string, reason: string, formula: string, activeNode?: string, edgeRelaxing?: { from: string; to: string }): AnimationFrame {
    const visualNodes: NodePosition[] = graph.nodes.map(n => ({
      id: n.id,
      value: `${n.id} (${dist[n.id] === Infinity ? '∞' : dist[n.id]})`,
      x: n.x,
      y: n.y,
      state: activeNode === n.id ? 'active' : visited.has(n.id) ? 'success' : 'default',
      customLabel: `Dist: ${dist[n.id] === Infinity ? '∞' : dist[n.id]}`
    }));

    const visualEdges: EdgeConnection[] = graph.edges.map(e => ({
      from: e.from,
      to: e.to,
      label: e.weight,
      highlighted: edgeRelaxing ? (edgeRelaxing.from === e.from && edgeRelaxing.to === e.to) || (edgeRelaxing.from === e.to && edgeRelaxing.to === e.from) : false,
      color: edgeRelaxing && ((edgeRelaxing.from === e.from && edgeRelaxing.to === e.to) || (edgeRelaxing.from === e.to && edgeRelaxing.to === e.from)) ? '#00f2fe' : undefined
    }));

    return {
      stepIndex: frames.length + 1,
      totalSteps: 0,
      title,
      explanation: { action, reason, formula },
      highlightCodeLines: {
        cpp: [14, 15, 16],
        java: [12, 13],
        python: [8, 9],
        javascript: [10, 11]
      },
      nodes: visualNodes,
      edges: visualEdges,
      arrayState: [
        {
          label: 'Distance Array',
          values: graph.nodes.map(n => `${n.id}:${dist[n.id] === Infinity ? '∞' : dist[n.id]}`)
        }
      ],
      variableWatch: {
        'Current Node': activeNode ?? 'None',
        'Visited Nodes': Array.from(visited).join(', ') || 'None',
        'Source Node': 'A'
      }
    };
  }

  // Frame 1: Init
  frames.push(makeFrame(
    'Initialize Dijkstra Algorithm',
    'Set Source Distance to 0, All Others to Infinity',
    'Source node A gets distance 0. Unvisited nodes get distance ∞.',
    'dist[A] = 0, dist[others] = ∞',
    'A'
  ));

  // Run Dijkstra algorithm loop
  while (visited.size < graph.nodes.length) {
    let u: string | null = null;
    let minDist = Infinity;

    for (const n of graph.nodes) {
      if (!visited.has(n.id) && dist[n.id] < minDist) {
        minDist = dist[n.id];
        u = n.id;
      }
    }

    if (!u || minDist === Infinity) break;

    visited.add(u);

    frames.push(makeFrame(
      `Pick Smallest Unvisited Vertex '${u}' (Dist = ${dist[u]})`,
      `Extracted Node ${u} from Priority Queue`,
      `Node ${u} has the minimum tentative distance among unvisited vertices.`,
      `u = argmin(dist[v]) for v ∉ Visited`,
      u
    ));

    // Relax neighbors
    const outgoing = graph.edges.filter(e => e.from === u || e.to === u);
    for (const edge of outgoing) {
      const v = edge.from === u ? edge.to : edge.from;
      if (visited.has(v)) continue;

      const alt = dist[u] + edge.weight;
      if (alt < dist[v]) {
        dist[v] = alt;
        prev[v] = u;
        frames.push(makeFrame(
          `Relax Edge (${u} -> ${v}, Weight = ${edge.weight})`,
          `Updated dist[${v}] from old value to ${alt}`,
          `Found shorter path to ${v}: dist[${u}] (${dist[u]}) + weight (${edge.weight}) = ${alt} < dist[${v}].`,
          `dist[${v}] = min(dist[${v}], dist[${u}] + weight)`,
          u,
          { from: u, to: v }
        ));
      }
    }
  }

  // Final summary frame
  frames.push(makeFrame(
    'Dijkstra Traversal Complete',
    'All Shortest Paths Computed',
    'Shortest paths from Source A to all nodes have been determined.',
    'Time Complexity: O((V + E) log V)',
    undefined
  ));

  const total = frames.length;
  frames.forEach(f => f.totalSteps = total);
  return frames;
}
