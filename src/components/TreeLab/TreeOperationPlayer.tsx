import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw, Search, Plus, Trash2, RefreshCw } from 'lucide-react';
import { generateAVLTreeFrames } from '../../algorithms/avlTreeEngine';
import { generateInteractiveDeleteFrames, generateInteractiveInsertFrames, generateInteractiveSearchFrames } from '../../algorithms/interactiveTreeEngine';
import { TreeSvgCanvas } from '../Visualizer/TreeSvgCanvas';
import type { AnimationFrame } from '../../types';

export type LabOperation = 'search'|'insert'|'delete'|'rotate';
const OPERATIONS:{key:LabOperation;label:string;Icon:typeof Search;help:string}[]=[
  {key:'search',label:'Search',Icon:Search,help:'Follow BST comparisons without changing structure.'},
  {key:'insert',label:'Insert',Icon:Plus,help:'Insert as BST, update heights, and repair imbalance.'},
  {key:'delete',label:'Delete',Icon:Trash2,help:'Remove the key, choose a replacement, and rebalance upward.'},
  {key:'rotate',label:'Rotate',Icon:RefreshCw,help:'Watch single or double rotations move the heavy path.'},
];

function insertionState(values:number[]){let state:number[]=[];for(const value of values)state=generateInteractiveInsertFrames(state,value,{balancing:true}).updatedValues;return state}
function buildFrames(values:number[],operation:LabOperation):AnimationFrame[]{
  const safe=[...new Set(values.filter(Number.isFinite))].slice(0,12);if(!safe.length)return[];
  if(operation==='rotate')return generateAVLTreeFrames(safe);
  if(operation==='insert'){const base=safe.slice(0,-1),target=safe[safe.length-1];return generateInteractiveInsertFrames(insertionState(base),target,{balancing:true}).frames}
  if(operation==='search'){const target=safe[safe.length-1];return generateInteractiveSearchFrames(safe,target)}
  const target=safe[safe.length-1];return generateInteractiveDeleteFrames(safe,target,{balancing:true}).frames;
}

export const TreeOperationPlayer:React.FC<{values:number[];initialOperation?:LabOperation;compact?:boolean}> = ({values,initialOperation='search',compact=false}) => {
  const [operation,setOperation]=useState<LabOperation>(initialOperation),[step,setStep]=useState(0),[playing,setPlaying]=useState(false),[speed,setSpeed]=useState(1);
  const generation=useRef(0);const frames=useMemo(()=>buildFrames(values,operation),[values,operation]);const frame=frames[Math.min(step,Math.max(0,frames.length-1))];
  useEffect(()=>{generation.current++;setStep(0);setPlaying(false)},[frames]);
  useEffect(()=>{if(!playing||frames.length<2)return;const own=generation.current;const timer=window.setTimeout(()=>{if(own!==generation.current)return;setStep(current=>{if(current>=frames.length-1){setPlaying(false);return current}return current+1})},900/speed);return()=>window.clearTimeout(timer)},[playing,step,speed,frames.length]);
  const choose=(next:LabOperation)=>{setOperation(next);setStep(0);setPlaying(false)};
  return <div className={`tree-operation-player ${compact?'compact':''}`}>
    <div className="operation-selector">{OPERATIONS.map(({key,label,Icon,help})=><button key={key} className={operation===key?'active':''} onClick={()=>choose(key)} title={help}><Icon size={16}/><span>{label}</span></button>)}</div>
    <div className="operation-live-grid"><div className="operation-canvas"><div className="live-badge"><i/> LIVE NODE PLAYBACK <span>{operation.toUpperCase()}</span></div><TreeSvgCanvas nodes={frame?.nodes||[]} edges={frame?.edges||[]}/></div><aside><span>STEP {frames.length?step+1:0} / {frames.length}</span><h4>{frame?.title||'Enter valid unique values to begin'}</h4><p><b>{frame?.explanation.action}</b>{frame?.explanation.reason||OPERATIONS.find(item=>item.key===operation)?.help}</p>{frame?.explanation.variables&&<div className="live-variables">{Object.entries(frame.explanation.variables).slice(0,5).map(([key,value])=><div key={key}><b>{key}</b><code>{String(value)}</code></div>)}</div>}</aside></div>
    <div className="operation-play-controls"><button onClick={()=>setStep(value=>Math.max(0,value-1))} disabled={step===0}><ChevronLeft/></button><button className="primary" onClick={()=>setPlaying(value=>!value)} disabled={frames.length<2}>{playing?<Pause/>:<Play/>}{playing?'Pause':'Play operation'}</button><button onClick={()=>setStep(value=>Math.min(frames.length-1,value+1))} disabled={!frames.length||step>=frames.length-1}><ChevronRight/></button><button onClick={()=>{setStep(0);setPlaying(false)}}><RotateCcw/></button><label>Speed<select value={speed} onChange={event=>setSpeed(Number(event.target.value))}><option value={.5}>0.5×</option><option value={1}>1×</option><option value={1.5}>1.5×</option><option value={2}>2×</option></select></label><div className="operation-timeline"><span style={{width:`${frames.length<=1?0:(step/(frames.length-1))*100}%`}}/></div></div>
  </div>;
};
