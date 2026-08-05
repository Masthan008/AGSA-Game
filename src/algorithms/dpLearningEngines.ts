import { AnimationFrame } from '../types';

const push = (frames: AnimationFrame[], title: string, action: string, reason: string, matrix: number[][], variables: Record<string, unknown>, formula?: string) => frames.push({
  stepIndex: frames.length + 1, totalSteps: 0, title, explanation: { action, reason, formula }, nodes: [], edges: [], dpMatrix: matrix.map(row => [...row]), variableWatch: variables,
});
const finish = (frames: AnimationFrame[]) => { frames.forEach(frame => frame.totalSteps = frames.length); return frames; };

export function generateLcsFrames(first = 'ABCDGH', second = 'AEDFHR'): AnimationFrame[] {
  const frames: AnimationFrame[] = [], dp = Array.from({length:first.length+1},()=>Array(second.length+1).fill(0));
  push(frames,'Initialize LCS table','Set every empty-prefix result to zero.','An empty string has no common subsequence with any prefix.',dp,{First:first,Second:second});
  for(let i=1;i<=first.length;i++) for(let j=1;j<=second.length;j++){
    const match=first[i-1]===second[j-1]; dp[i][j]=match?dp[i-1][j-1]+1:Math.max(dp[i-1][j],dp[i][j-1]);
    push(frames,`Compare ${first[i-1]} and ${second[j-1]}`,match?'Characters match: extend the diagonal subsequence.':'Characters differ: keep the better neighbouring prefix.','Each cell is the best LCS length for exactly these two prefixes.',dp,{i,j,'LCS length':dp[i][j]},match?'dp[i][j] = 1 + dp[i−1][j−1]':'dp[i][j] = max(dp[i−1][j], dp[i][j−1])');
  } return finish(frames);
}

export function generateEditDistanceFrames(first='horse',second='ros'):AnimationFrame[]{
  const frames:AnimationFrame[]=[],dp=Array.from({length:first.length+1},(_,i)=>Array.from({length:second.length+1},(_,j)=>i===0?j:j===0?i:0));
  push(frames,'Initialize edit-distance table','Fill empty-prefix costs along the first row and column.','Converting to or from empty requires one operation per character.',dp,{First:first,Second:second});
  for(let i=1;i<=first.length;i++)for(let j=1;j<=second.length;j++){const cost=first[i-1]===second[j-1]?0:1;dp[i][j]=Math.min(dp[i-1][j]+1,dp[i][j-1]+1,dp[i-1][j-1]+cost);push(frames,`Solve prefixes ${first.slice(0,i)} → ${second.slice(0,j)}`,cost===0?'Carry the diagonal value because the final characters match.':'Choose the cheapest insert, delete, or replace.','Optimal substructure reduces the problem to three shorter prefix pairs.',dp,{i,j,Cost:dp[i][j]},'min(delete, insert, replace)');}return finish(frames);
}

export function generateMatrixChainFrames(dimensions=[10,20,30,40,30]):AnimationFrame[]{
  const n=dimensions.length-1,frames:AnimationFrame[]=[],dp=Array.from({length:n},()=>Array(n).fill(0));
  push(frames,'Initialize matrix-chain table','A single matrix needs zero scalar multiplications.','Only chains of length two or more require a split.',dp,{Dimensions:dimensions.join(' × ')});
  for(let length=2;length<=n;length++)for(let i=0;i<=n-length;i++){const j=i+length-1;dp[i][j]=Number.MAX_SAFE_INTEGER;let best=i;for(let k=i;k<j;k++){const cost=dp[i][k]+dp[k+1][j]+dimensions[i]*dimensions[k+1]*dimensions[j+1];if(cost<dp[i][j]){dp[i][j]=cost;best=k;}}push(frames,`Optimize matrices ${i+1}…${j+1}`,`Best split is after matrix ${best+1}.`,'Try every final multiplication split and retain the cheapest.',dp,{Chain:`A${i+1}…A${j+1}`,Split:best+1,Cost:dp[i][j]},'m[i,j] = min(m[i,k] + m[k+1,j] + p[i−1]p[k]p[j])');}return finish(frames);
}

export function generateBitmaskDpFrames():AnimationFrame[]{
  const distance=[[0,10,15,20],[10,0,35,25],[15,35,0,30],[20,25,30,0]],n=4,size=1<<n,inf=999,dp=Array.from({length:size},()=>Array(n).fill(inf));dp[1][0]=0;const frames:AnimationFrame[]=[];
  push(frames,'Initialize Held–Karp states','Mask 0001 means only city 0 has been visited.','A state stores the cheapest route ending at a chosen city.',dp,{Mask:'0001',End:0});
  for(let mask=1;mask<size;mask++)for(let u=0;u<n;u++)if(dp[mask][u]<inf)for(let v=0;v<n;v++)if(!(mask&(1<<v))){const next=mask|(1<<v),candidate=dp[mask][u]+distance[u][v];if(candidate<dp[next][v]){dp[next][v]=candidate;push(frames,`Add city ${v} to ${mask.toString(2).padStart(n,'0')}`,`Reach city ${v} with cost ${candidate}.`,'The bit test guarantees each city is visited at most once.',dp,{Mask:next.toString(2).padStart(n,'0'),End:v,Cost:candidate},'next = mask | (1 << city)');}}return finish(frames);
}

export function generateNQueensFrames(n=4):AnimationFrame[]{
  const frames:AnimationFrame[]=[],board=Array.from({length:n},()=>Array(n).fill(0)),cols=new Set<number>(),down=new Set<number>(),up=new Set<number>();
  const search=(row:number):boolean=>{if(row===n){push(frames,'Solution found','Every row contains one non-attacking queen.','All column and diagonal constraints are satisfied.',board,{Queens:n});return true;}for(let col=0;col<n;col++){if(cols.has(col)||down.has(row-col)||up.has(row+col))continue;board[row][col]=1;cols.add(col);down.add(row-col);up.add(row+col);push(frames,`Place queen at (${row}, ${col})`,'Mark its column and diagonals unavailable.','Pruning prevents exploring any immediately invalid board.',board,{Row:row,Column:col});if(search(row+1))return true;board[row][col]=0;cols.delete(col);down.delete(row-col);up.delete(row+col);push(frames,`Backtrack from (${row}, ${col})`,'Undo the choice and try the next column.','No complete solution was reachable from that placement.',board,{Row:row});}return false;};search(0);return finish(frames);
}
