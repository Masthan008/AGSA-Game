import { AnimationFrame, EdgeConnection, NodePosition } from '../types';

const linearNodes=(values:(string|number)[],active:number[]=[],row=0):NodePosition[]=>values.map((value,index)=>({id:`${row}-${index}-${value}`,value,x:45+index*62,y:55+row*75,state:active.includes(index)?'active':'default',label:String(index)}));
const push=(frames:AnimationFrame[],title:string,action:string,reason:string,nodes:NodePosition[],edges:EdgeConnection[]=[],variables:Record<string,unknown>={},dpMatrix?:unknown)=>frames.push({stepIndex:frames.length+1,totalSteps:0,title,explanation:{action,reason},nodes,edges,variableWatch:variables,dpMatrix});
const finish=(frames:AnimationFrame[])=>{frames.forEach(frame=>frame.totalSteps=frames.length);return frames;};

export function generateHeapFrames(input=[5,12,9,20,14,18,3]):AnimationFrame[]{
  const frames:AnimationFrame[]=[],heap:number[]=[];
  for(const value of input){heap.push(value);let i=heap.length-1;push(frames,`Insert ${value}`,`Append ${value} at index ${i}.`,'A heap remains a complete binary tree by filling the array from left to right.',linearNodes(heap,[i]),[],{Heap:heap.join(', ')});while(i>0){const parent=Math.floor((i-1)/2);if(heap[parent]<=heap[i])break;[heap[parent],heap[i]]=[heap[i],heap[parent]];push(frames,`Swap ${heap[parent]} upward`,'Exchange the child with its larger parent.','Sift-up restores the min-heap order on the insertion path.',linearNodes(heap,[parent,i]),[],{Child:i,Parent:parent,Heap:heap.join(', ')});i=parent;}}
  return finish(frames);
}

export function generateDsuFrames():AnimationFrame[]{
  const frames:AnimationFrame[]=[],names=['A','B','C','D','E'],parent=[0,1,2,3,4];
  const find=(x:number):number=>parent[x]===x?x:(parent[x]=find(parent[x]));
  push(frames,'Initialize disjoint sets','Every item starts as its own representative.','The parent array encodes a forest of components.',linearNodes(names),[],{Parents:parent.join(', ')});
  for(const [a,b] of [[0,1],[2,3],[1,2],[3,4]]){const ra=find(a),rb=find(b);if(ra!==rb)parent[rb]=ra;const edges:EdgeConnection[]=parent.flatMap((p,i)=>p===i?[]:[{from:`0-${i}-${names[i]}`,to:`0-${p}-${names[p]}`}]);push(frames,`Union ${names[a]} and ${names[b]}`,`Attach representative ${names[rb]} beneath ${names[ra]}.`,'Union changes one root pointer; find follows roots to test connectivity.',linearNodes(names,[a,b]),edges,{Parents:parent.join(', '),Components:new Set(parent.map((_,i)=>find(i))).size});}
  return finish(frames);
}

export function generateHashingFrames(values=[21,14,37,8,29]):AnimationFrame[]{
  const frames:AnimationFrame[]=[],buckets:string[][]=Array.from({length:7},()=>[]);
  push(frames,'Create seven buckets','Start every collision chain empty.','The modulus maps arbitrary integer keys into the fixed bucket range.',linearNodes(buckets.map((_,i)=>`B${i}`)),[],{Formula:'key mod 7'});
  for(const value of values){const index=value%buckets.length;buckets[index].push(String(value));const nodes=linearNodes(buckets.map((bucket,i)=>`B${i}: ${bucket.join(' → ')||'∅'}`),[index]);push(frames,`Hash ${value} → bucket ${index}`,buckets[index].length>1?'Append to the existing collision chain.':'Store the key in the empty chain.','Separate chaining preserves every key that shares a hash.',nodes,[],{Key:value,Bucket:index,'Load factor':(values.indexOf(value)+1)/buckets.length});}
  return finish(frames);
}

export function generateFenwickFrames(values=[2,1,3,4,5]):AnimationFrame[]{
  const frames:AnimationFrame[]=[],tree=Array(values.length+1).fill(0);
  push(frames,'Initialize Fenwick array','Use one-based indexes and start all partial sums at zero.','Index zero is excluded because lowbit(0) cannot advance.',linearNodes(tree.slice(1)),[],{Input:values.join(', ')});
  values.forEach((value,zero)=>{for(let i=zero+1;i<tree.length;i+=i&-i){tree[i]+=value;push(frames,`Update tree[${i}]`, `Add ${value}; the stored sum becomes ${tree[i]}.`,'i += lowbit(i) visits exactly the ranges containing the updated position.',linearNodes(tree.slice(1),[i-1]),[],{i,lowbit:i&-i,Tree:tree.slice(1).join(', ')});}});return finish(frames);
}

export function generateRadixSortFrames(input=[170,45,75,90,802,24,2,66]):AnimationFrame[]{
  const frames:AnimationFrame[]=[],values=[...input],max=Math.max(...values);
  push(frames,'Start LSD radix sort','Process digits from units toward the most significant place.','Stable digit passes preserve the ordering established by earlier digits.',linearNodes(values),[],{Values:values.join(', ')});
  for(let exp=1;Math.floor(max/exp)>0;exp*=10){const buckets:number[][]=Array.from({length:10},()=>[]);values.forEach(value=>buckets[Math.floor(value/exp)%10].push(value));values.splice(0,values.length,...buckets.flat());push(frames,`Stable pass at place ${exp}`,`Collect buckets 0 through 9: ${values.join(', ')}.`,'Stability ensures lower-place ties remain correctly ordered.',linearNodes(values),[],{Place:exp,Buckets:buckets.map((b,i)=>`${i}:${b.join(',')}`).join(' | ')});}return finish(frames);
}

export function generateBloomFilterFrames(words=['cat','dog','tree']):AnimationFrame[]{
  const frames:AnimationFrame[]=[],bits=Array(16).fill(0),hashes=[(s:string)=>[...s].reduce((a,c)=>a+c.charCodeAt(0),0)%16,(s:string)=>[...s].reduce((a,c)=>a*31+c.charCodeAt(0),7)%16];
  push(frames,'Initialize bit array','All bits begin at zero.','A zero proves that no inserted key used that hash position.',linearNodes(bits),[],{Bits:bits.join('')});
  for(const word of words){const positions=hashes.map(hash=>hash(word));positions.forEach(i=>bits[i]=1);push(frames,`Insert “${word}”`,`Set positions ${positions.join(' and ')} to one.`,'Multiple independent hashes reduce accidental false-positive matches.',linearNodes(bits,positions),[],{Word:word,Hashes:positions.join(', '),Bits:bits.join('')});}return finish(frames);
}

export function generateSparseTableFrames(values=[1,3,-1,7,0,3,5]):AnimationFrame[]{
  const frames:AnimationFrame[]=[],levels=Math.floor(Math.log2(values.length))+1,table=Array.from({length:levels},()=>Array(values.length).fill(0));table[0]=[...values];push(frames,'Store length-one ranges','Level 0 is the original array.','Every later row doubles the covered interval length.',[],[],{Input:values.join(', ')},table);
  for(let k=1;k<levels;k++){for(let i=0;i+(1<<k)<=values.length;i++)table[k][i]=Math.min(table[k-1][i],table[k-1][i+(1<<(k-1))]);push(frames,`Build intervals of length ${1<<k}`,'Combine two adjacent half-length minimums.','Power-of-two blocks make every static RMQ answerable with two lookups.',[],[],{Level:k,Length:1<<k},table);}return finish(frames);
}

export function generateRedBlackFrames():AnimationFrame[]{
  const frames:AnimationFrame[]=[];
  const states=[
    {title:'Insert 10 as a black root',values:[10],colors:['#000'],action:'The root must always be black.'},
    {title:'Insert red child 20',values:[10,20],colors:['#000','#FF3B30'],action:'New non-root nodes begin red to preserve black height.'},
    {title:'Insert red node 30: violation',values:[10,20,30],colors:['#000','#FF3B30','#FF3B30'],action:'Parent 20 and child 30 are both red, so repair is required.'},
    {title:'Rotate left and recolor',values:[20,10,30],colors:['#000','#FF3B30','#FF3B30'],action:'Promote 20, color it black, and make 10 and 30 red.'},
  ];
  states.forEach((state,index)=>{const nodes=state.values.map((value,i)=>({id:`rb-${index}-${value}`,value,x:i===0?280:i===1?180:380,y:i===0?45:125,color:state.colors[i],state:index===2&&i>0?'error':'default'} as NodePosition));const edges:EdgeConnection[] = state.values.length>1?state.values.slice(1).map(value=>({from:`rb-${index}-${state.values[0]}`,to:`rb-${index}-${value}`})):[];push(frames,state.title,state.action,'Rotations preserve BST order; recoloring restores red-parent and black-height invariants.',nodes,edges,{Root:state.values[0]});});return finish(frames);
}

export function generateSkipListFrames():AnimationFrame[]{
  const frames:AnimationFrame[]=[],base=[3,7,12,19,25],levels=[[3,12,25],[3,7,12,19,25]];
  push(frames,'Build randomized express lanes','Promote a subset of sorted keys to the upper level.','Upper links skip across several base-list nodes.',levels.flatMap((row,r)=>linearNodes(row,[],r)),[],{Target:19});
  push(frames,'Move right on the express lane','Advance from 3 to 12; moving to 25 would overshoot 19.','Search stays on the highest useful level.',levels.flatMap((row,r)=>linearNodes(row,r===0?[1]:[],r)),[],{Current:12,Target:19});
  push(frames,'Drop and finish at 19','Move on the base level from 12 to 19.','Expected tower spacing yields logarithmic search.',linearNodes(base,[3],1),[],{Found:19});return finish(frames);
}

export function generateSplayFrames():AnimationFrame[]{
  const frames:AnimationFrame[]=[];
  const make=(root:number,left:number,right:number,title:string,action:string)=>{const nodes=[{id:`${title}-r`,value:root,x:280,y:45},{id:`${title}-l`,value:left,x:180,y:125},{id:`${title}-rr`,value:right,x:380,y:125}] as NodePosition[];push(frames,title,action,'Splaying keeps BST order while moving the accessed key to the root.',nodes,[{from:nodes[0].id,to:nodes[1].id},{from:nodes[0].id,to:nodes[2].id}],{Root:root});};
  make(10,5,20,'Search for 20','Follow the BST comparison to the right child.');make(20,10,30,'Zig rotation','Rotate 20 above its parent because its parent was the root.');return finish(frames);
}

export function generateAmortizedFrames():AnimationFrame[]{
  const frames:AnimationFrame[]=[],array:(number|string)[]=Array(1).fill('∅');let size=0,total=0;
  for(let value=1;value<=8;value++){let cost=1;if(size===array.length){const old=array.length;array.push(...Array(old).fill('∅'));cost+=size;push(frames,`Resize capacity ${old} → ${array.length}`,`Copy ${size} existing elements before appending.`,'Doubling ensures the next expensive copy is separated by many constant-cost appends.',linearNodes(array),[],{ActualCost:cost,TotalCost:total+cost,Capacity:array.length});}array[size++]=value;total+=cost;push(frames,`Append ${value}`,`Write at index ${size-1}; actual cost ${cost}.`,'Although resize steps are expensive, total cost stays linear across all appends.',linearNodes(array,[size-1]),[],{Operations:value,TotalCost:total,'Amortized cost':(total/value).toFixed(2)});}return finish(frames);
}

export function generateFibonacciHeapFrames():AnimationFrame[]{
  const frames:AnimationFrame[]=[];const roots=linearNodes([3,7,18]);push(frames,'Root list with minimum 3','Keep multiple heap-ordered trees without immediate consolidation.','Lazy structure makes meld and insertion constant amortized time.',roots,[],{Minimum:3});
  const before=[...roots,{id:'child-2',value:2,x:360,y:135,color:'#FF3B30'} as NodePosition];push(frames,'Decrease child key 24 → 2','The new key violates its parent’s heap order.','A violating node must be cut from its parent.',before,[{from:roots[2].id,to:'child-2'}],{NewKey:2});
  push(frames,'Cut node 2 to the root list','Move 2 to the root list and update the minimum pointer.','The potential stored in marked nodes pays for cascading cuts.',linearNodes([2,3,7,18],[0]),[],{Minimum:2,'Amortized cost':'O(1)'});return finish(frames);
}

export function generateRabinKarpFrames(text='GEEKS FOR GEEKS',pattern='GEEK'):AnimationFrame[]{
  const frames:AnimationFrame[]=[],base=256,mod=101,m=pattern.length;const hash=(s:string)=>[...s].reduce((h,c)=>(h*base+c.charCodeAt(0))%mod,0);const target=hash(pattern);frameLoop:for(let i=0;i<=text.length-m;i++){const window=text.slice(i,i+m),current=hash(window);push(frames,`Window ${i}: “${window}”`,`Compare hash ${current} with pattern hash ${target}.`,current===target?'Equal hashes require a direct character check because collisions are possible.':'Different hashes prove the strings differ.',linearNodes([...text],Array.from({length:m},(_,k)=>i+k)),[],{Window:i,PatternHash:target,WindowHash:current,Match:current===target&&window===pattern});if(current===target&&window===pattern&&i>0)break frameLoop;}return finish(frames);
}

export function generateConvexHullFrames():AnimationFrame[]{
  const frames:AnimationFrame[]=[],points=[[0,0],[1,1],[2,0],[2,2],[1,3],[0,2],[1,2]];const cross=(o:number[],a:number[],b:number[])=>(a[0]-o[0])*(b[1]-o[1])-(a[1]-o[1])*(b[0]-o[0]);const sorted=[...points].sort((a,b)=>a[0]-b[0]||a[1]-b[1]),lower:number[][]=[];const nodes=()=>points.map((p,i)=>({id:`p-${i}`,value:`${p[0]},${p[1]}`,x:90+p[0]*120,y:210-p[1]*50,state:lower.some(q=>q===p)?'active':'default'} as NodePosition));
  push(frames,'Sort points left to right','Prepare a monotonic-chain hull scan.','Sorted order lets each boundary be built with a stack.',nodes(),[],{Points:sorted.map(p=>`(${p})`).join(' ')});for(const point of sorted){while(lower.length>=2&&cross(lower[lower.length-2],lower[lower.length-1],point)<=0){const removed=lower.pop()!;push(frames,`Pop (${removed})`,`The newest turn is clockwise or collinear.`,'An inward turn cannot belong to the lower convex boundary.',nodes(),[],{Candidate:`(${point})`});}lower.push(point);push(frames,`Push (${point})`,'The stack remains counter-clockwise.','Every retained edge supports the enclosing polygon.',nodes(),[],{LowerHull:lower.map(p=>`(${p})`).join(' → ')});}return finish(frames);
}

export function generateNpCompleteFrames():AnimationFrame[]{
  const frames:AnimationFrame[]=[],problems=['3-SAT','Vertex Cover','Clique','Hamiltonian Cycle'];push(frames,'Start from known NP-complete 3-SAT','Choose a problem whose hardness is already established.','A polynomial reduction transfers hardness to the target problem.',linearNodes(problems,[0]),[],{Question:'Is there a satisfying assignment?'});push(frames,'Construct a Vertex Cover instance','Map variables and clauses into graph gadgets in polynomial time.','The construction must preserve yes and no answers in both directions.',linearNodes(problems,[0,1]),[{from:'0-0-3-SAT',to:'0-1-Vertex Cover'}],{Invariant:'formula satisfiable ⇔ cover of size k'});push(frames,'Use a 2-approximation when exact search is impractical','Select both endpoints of each uncovered matching edge.','The matching lower-bounds OPT, while the algorithm selects exactly twice as many endpoints.',linearNodes(['OPT','Approx ≤ 2·OPT'],[1]),[],{'Approximation ratio':2});return finish(frames);
}
