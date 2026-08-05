import { AnimationFrame, EdgeConnection, NodePosition } from '../types';

const POSITIONS: Record<string, [number, number]> = { A: [80, 80], B: [220, 35], C: [220, 145], D: [390, 55], E: [390, 155] };
type GraphEdge = readonly [string, string, number];
const WEIGHTED: readonly GraphEdge[] = [['A','B',4], ['A','C',2], ['B','C',1], ['B','D',5], ['C','D',8], ['C','E',10], ['D','E',2]];

const makeFrame = (frames: AnimationFrame[], title: string, action: string, reason: string, active: string[] = [], edges: readonly GraphEdge[] = WEIGHTED, variables: Record<string, unknown> = {}, formula?: string, dpMatrix?: unknown) => {
  const nodes: NodePosition[] = Object.entries(POSITIONS).map(([id, [x,y]]) => ({ id, value: id, x, y, state: active.includes(id) ? 'active' : 'default' }));
  const links: EdgeConnection[] = edges.map(([from,to,weight]) => ({ from, to, weight, label: weight, highlighted: active.includes(from) && active.includes(to) }));
  frames.push({ stepIndex: frames.length + 1, totalSteps: 0, title, explanation: { action, reason, formula }, nodes, edges: links, variableWatch: variables, dpMatrix });
};
const finish = (frames: AnimationFrame[]) => { frames.forEach(frame => frame.totalSteps = frames.length); return frames; };

export function generateBfsDfsFrames(): AnimationFrame[] {
  const frames: AnimationFrame[] = [], graph: Record<string,string[]> = { A:['B','C'], B:['D'], C:['D','E'], D:['E'], E:[] };
  const queue = ['A'], seen = new Set(['A']), order: string[] = [];
  makeFrame(frames, 'Start BFS at A', 'Mark A visited and enqueue it.', 'A vertex is enqueued only once, preventing cycles from repeating work.', ['A'], WEIGHTED, { Queue: queue.join(' → ') });
  while (queue.length) {
    const node = queue.shift()!; order.push(node);
    for (const next of graph[node]) if (!seen.has(next)) { seen.add(next); queue.push(next); }
    makeFrame(frames, `Visit ${node}`, `Explore every unvisited neighbour of ${node}.`, 'A FIFO queue visits vertices in increasing edge distance from the source.', [...seen], WEIGHTED, { Queue: queue.join(' → ') || 'empty', Order: order.join(' → ') });
  }
  return finish(frames);
}

export function generateBellmanFordFrames(): AnimationFrame[] {
  const frames: AnimationFrame[] = [], distance: Record<string,number> = { A:0, B:Infinity, C:Infinity, D:Infinity, E:Infinity };
  makeFrame(frames, 'Initialize distances', 'Set source A to 0 and every other distance to ∞.', 'Bellman–Ford grows known shortest paths one edge per pass.', ['A'], WEIGHTED, { ...distance });
  for (let pass=1; pass<5; pass++) {
    let changed = false;
    for (const [u,v,w] of WEIGHTED) if (distance[u] + w < distance[v]) { distance[v] = distance[u] + w; changed = true; makeFrame(frames, `Pass ${pass}: relax ${u} → ${v}`, `Update dist[${v}] to ${distance[v]}.`, 'A shorter route was found through the edge’s start vertex.', [u,v], WEIGHTED, { Pass: pass, ...distance }, `dist[${v}] = min(dist[${v}], dist[${u}] + ${w})`); }
    if (!changed) { makeFrame(frames, 'Stop early', 'No edge changed during this pass.', 'All shortest distances are stable; another pass cannot improve them.', Object.keys(distance), WEIGHTED, distance); break; }
  }
  return finish(frames);
}

export function generateMstFrames(): AnimationFrame[] {
  const frames: AnimationFrame[] = [], parent: Record<string,string> = Object.fromEntries(Object.keys(POSITIONS).map(x=>[x,x]));
  const find = (x:string):string => parent[x] === x ? x : (parent[x] = find(parent[x]));
  const chosen: GraphEdge[] = [];
  makeFrame(frames, 'Sort edges by weight', 'Consider the cheapest edge first.', 'Kruskal grows a minimum forest and rejects cycle-forming edges.', [], WEIGHTED, { Order: [...WEIGHTED].sort((a,b)=>a[2]-b[2]).map(e=>`${e[0]}-${e[1]}:${e[2]}`).join(', ') });
  for (const edge of [...WEIGHTED].sort((a,b)=>a[2]-b[2])) {
    const [u,v,w]=edge;
    if (find(u) !== find(v)) { parent[find(u)] = find(v); chosen.push(edge); makeFrame(frames, `Accept ${u}—${v}`, `Add weight ${w} without creating a cycle.`, 'The endpoints belonged to different DSU components.', [u,v], chosen, { 'MST weight': chosen.reduce((s,e)=>s+e[2],0) }); }
    else makeFrame(frames, `Reject ${u}—${v}`, 'Skip this edge because its endpoints are already connected.', 'Adding it would create a cycle.', [u,v], chosen, { Decision: 'cycle' });
    if (chosen.length === Object.keys(POSITIONS).length - 1) break;
  }
  return finish(frames);
}

export function generateFloydWarshallFrames(): AnimationFrame[] {
  const frames: AnimationFrame[] = [], ids = Object.keys(POSITIONS), inf = 999;
  const d: number[][] = ids.map((_,i)=>ids.map((_,j)=>i===j?0:inf));
  WEIGHTED.forEach(([u,v,w]) => { d[ids.indexOf(u)][ids.indexOf(v)] = w; d[ids.indexOf(v)][ids.indexOf(u)] = w; });
  makeFrame(frames, 'Initialize distance matrix', 'Copy direct edge weights; use ∞ when no direct edge exists.', 'Row i and column j represent the best known i → j distance.', [], WEIGHTED, {}, undefined, d.map(row=>[...row]));
  ids.forEach((mid,k) => {
    let updates=0;
    for(let i=0;i<ids.length;i++) for(let j=0;j<ids.length;j++) if(d[i][k]+d[k][j]<d[i][j]) { d[i][j]=d[i][k]+d[k][j]; updates++; }
    makeFrame(frames, `Allow ${mid} as an intermediate`, `Updated ${updates} matrix entr${updates===1?'y':'ies'}.`, 'Every shortest path either avoids the new intermediate or passes through it.', [mid], WEIGHTED, { Intermediate: mid, Updates: updates }, 'd[i][j] = min(d[i][j], d[i][k] + d[k][j])', d.map(row=>[...row]));
  });
  return finish(frames);
}

export function generateTopologicalFrames(): AnimationFrame[] {
  const dag = [['A','B',1],['A','C',1],['B','D',1],['C','D',1],['C','E',1],['D','E',1]] as const;
  const frames: AnimationFrame[] = [], indegree: Record<string,number> = {A:0,B:1,C:1,D:2,E:2}, queue=['A'], order:string[]=[];
  makeFrame(frames, 'Compute indegrees', 'Queue every vertex with no unmet prerequisites.', 'Only a zero-indegree vertex can safely appear next.', ['A'], dag, { Indegrees: JSON.stringify(indegree), Queue:'A' });
  while(queue.length){ const u=queue.shift()!; order.push(u); for(const [from,to] of dag) if(from===u && --indegree[to]===0) queue.push(to); makeFrame(frames, `Emit ${u}`, `Remove ${u} and its outgoing dependency edges.`, 'New zero-indegree vertices are now ready.', order, dag, { Order:order.join(' → '), Queue:queue.join(', ')||'empty' }); }
  return finish(frames);
}

export function generateTarjanFrames(): AnimationFrame[] {
  const directed = [['A','B',1],['B','C',1],['C','A',1],['B','D',1],['D','E',1],['E','D',1]] as const;
  const frames: AnimationFrame[] = [], adjacency:Record<string,string[]>={A:['B'],B:['C','D'],C:['A'],D:['E'],E:['D']}, index:Record<string,number>={}, low:Record<string,number>={}, stack:string[]=[], on=new Set<string>(); let next=0;
  const visit=(u:string)=>{ index[u]=low[u]=next++; stack.push(u); on.add(u); makeFrame(frames,`Discover ${u}`,`Set index and low-link to ${index[u]}.`,'The stack contains the active DFS path.',[...stack],directed,{Stack:stack.join(' → '),Low:JSON.stringify(low)}); for(const v of adjacency[u]){ if(index[v]===undefined){visit(v);low[u]=Math.min(low[u],low[v]);}else if(on.has(v))low[u]=Math.min(low[u],index[v]); } if(low[u]===index[u]){const component:string[]=[];let v='';do{v=stack.pop()!;on.delete(v);component.push(v);}while(v!==u);makeFrame(frames,`SCC: ${component.join(', ')}`,'Pop through the component root.','All popped vertices can reach one another.',component,directed,{Component:component.join(', ')});} };
  Object.keys(POSITIONS).forEach(id=>{if(index[id]===undefined)visit(id);}); return finish(frames);
}

export function generateMaxFlowFrames(): AnimationFrame[] {
  const flowEdges = [['A','B',10],['A','C',8],['B','D',5],['B','C',2],['C','D',6],['C','E',5],['D','E',10]] as const;
  const frames:AnimationFrame[]=[]; let total=0;
  makeFrame(frames,'Initialize residual network','Begin with zero flow on every edge.','Residual capacity initially equals original capacity.',['A'],flowEdges,{Flow:0});
  const paths:[string[],number][]=[[['A','B','D','E'],5],[['A','C','E'],5],[['A','C','D','E'],3],[['A','B','C','D','E'],2]];
  for(const [path,bottleneck] of paths){total+=bottleneck;makeFrame(frames,`Augment ${path.join(' → ')}`,`Send ${bottleneck} units along the path.`, 'The bottleneck is the smallest residual capacity on the path.',path,flowEdges,{Bottleneck:bottleneck,'Total flow':total},'residual(u,v) = capacity(u,v) − flow(u,v)');}
  makeFrame(frames,`Maximum flow = ${total}`,'No source-to-sink residual path remains.','By max-flow/min-cut, the current feasible flow is optimal.',['A','E'],flowEdges,{'Maximum flow':total}); return finish(frames);
}
