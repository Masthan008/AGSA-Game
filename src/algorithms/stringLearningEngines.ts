import { AnimationFrame, NodePosition } from '../types';

const frame = (frames:AnimationFrame[],title:string,action:string,reason:string,text:string,active:number[],variables:Record<string,unknown>,arrayState?:unknown):void => {
  const nodes:NodePosition[]=[...text].map((value,index)=>({id:`char-${index}`,value,x:45+index*34,y:90,state:active.includes(index)?'active':'default',label:String(index)}));
  frames.push({stepIndex:frames.length+1,totalSteps:0,title,explanation:{action,reason},nodes,edges:[],variableWatch:variables,arrayState});
};
const finish=(frames:AnimationFrame[])=>{frames.forEach(item=>item.totalSteps=frames.length);return frames;};

export function generateSuffixArrayFrames(text='banana'):AnimationFrame[]{
  const frames:AnimationFrame[]=[],suffixes=[...text].map((_,index)=>({index,suffix:text.slice(index)}));
  frame(frames,'Generate every suffix','Take the substring beginning at each character.','A suffix array stores starting positions, not copied suffix strings.',text,[],{Suffixes:suffixes.map(item=>`${item.index}:${item.suffix}`).join(' | ')});
  suffixes.sort((a,b)=>a.suffix.localeCompare(b.suffix));
  suffixes.forEach((item,rank)=>frame(frames,`Rank ${rank}: ${item.suffix}`,`Place suffix ${item.index} at sorted rank ${rank}.`,'Lexicographic order groups common prefixes and enables binary search.',text,[item.index],{'Suffix array':suffixes.slice(0,rank+1).map(x=>x.index).join(', ')}));
  return finish(frames);
}

export function generateZFrames(text='aaabcxyzaaaabczaaczabbaaaaaabc'):AnimationFrame[]{
  const frames:AnimationFrame[]=[],z=Array(text.length).fill(0);let left=0,right=0;
  frame(frames,'Initialize Z window','Z[i] will measure the prefix match starting at i.','The [L,R] window remembers the rightmost known prefix match.',text,[],{L:left,R:right,Z:z.join(',')},z);
  for(let i=1;i<text.length;i++){if(i<=right)z[i]=Math.min(right-i+1,z[i-left]);while(i+z[i]<text.length&&text[z[i]]===text[i+z[i]])z[i]++;if(i+z[i]-1>right){left=i;right=i+z[i]-1;}frame(frames,`Compute Z[${i}] = ${z[i]}`,z[i]?`Matched ${z[i]} prefix character(s).`:'The first character differs from the prefix.','Reuse the known window first, then compare only beyond its right boundary.',text,Array.from({length:z[i]},(_,k)=>i+k),{i,L:left,R:right,'Z[i]':z[i]},[...z]);}return finish(frames);
}

export function generateManacherFrames(text='babad'):AnimationFrame[]{
  const transformed=`#${[...text].join('#')}#`,p=Array(transformed.length).fill(0),frames:AnimationFrame[]=[];let center=0,right=0;
  frame(frames,'Transform the string','Insert separators so odd and even palindromes use one rule.','Every palindrome now has a character or separator center.',transformed,[],{Original:text,Transformed:transformed},p);
  for(let i=0;i<transformed.length;i++){const mirror=2*center-i;if(i<right&&mirror>=0)p[i]=Math.min(right-i,p[mirror]);while(i-p[i]-1>=0&&i+p[i]+1<transformed.length&&transformed[i-p[i]-1]===transformed[i+p[i]+1])p[i]++;if(i+p[i]>right){center=i;right=i+p[i];}frame(frames,`Center ${i}: radius ${p[i]}`,`Expand equally to the left and right of ${transformed[i]}.`,'A mirrored radius supplies work already proven inside the current boundary.',transformed,Array.from({length:p[i]*2+1},(_,k)=>i-p[i]+k),{Center:center,Right:right,Mirror:mirror,Radius:p[i]},[...p]);}return finish(frames);
}
