import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, FlaskConical, GitBranch, Pause, Play, RotateCcw, Search, Split, XCircle } from 'lucide-react';
import { TreeOperationPlayer } from './TreeOperationPlayer';

type Topic = 'avl' | 'btree';
type Stage = 'learn' | 'identify' | 'practice';

const AVL_CASES = [
  { name: 'LL', sequence: '30, 20, 10', fix: 'Right rotation at 30', nodes: [30, 20, 10] },
  { name: 'RR', sequence: '10, 20, 30', fix: 'Left rotation at 10', nodes: [10, 20, 30] },
  { name: 'LR', sequence: '30, 10, 20', fix: 'Left at 10, then right at 30', nodes: [30, 10, 20] },
  { name: 'RL', sequence: '10, 30, 20', fix: 'Right at 30, then left at 10', nodes: [10, 30, 20] },
];

const AvlDiagram = ({ values = [30, 20, 40, 10, 25] }: { values?: number[] }) => (
  <svg className="tree-theory-svg" viewBox="0 0 520 260" role="img" aria-label="AVL tree with node heights and balance factors">
    <path d="M260 55 L150 130 M260 55 L370 130 M150 130 L95 210 M150 130 L205 210" />
    {[[260,55,values[0],0],[150,130,values[1],0],[370,130,values[2],0],[95,210,values[3],0],[205,210,values[4],0]].map(([x,y,key,bf], index) => <g key={index}><circle cx={x} cy={y} r="31" /><text x={x} y={y + 5}>{key}</text><text className="bf-label" x={x + 25} y={y - 23}>BF {bf}</text></g>)}
  </svg>
);

const BTreeDiagram = () => (
  <svg className="tree-theory-svg" viewBox="0 0 620 250" role="img" aria-label="B-tree with sorted multi-key nodes and equal-depth leaves">
    <path d="M310 65 L115 165 M310 65 L310 165 M310 65 L505 165" />
    <g><rect x="245" y="32" width="130" height="62" rx="15"/><text x="278" y="69">20 | 40</text></g>
    {[[45,'5 | 10'],[245,'25 | 30'],[440,'50 | 60']].map(([x,label]) => <g key={String(x)}><rect x={Number(x)} y="150" width="130" height="62" rx="15"/><text x={Number(x)+28} y="187">{label}</text></g>)}
  </svg>
);

const AvlExpectedOutput = () => (
  <svg className="tree-theory-svg expected-tree-svg" viewBox="0 0 520 220" role="img" aria-label="Balanced AVL output with root 20, left child 10, and right child 30">
    <path d="M260 62 L155 155 M260 62 L365 155" />
    {[[260,62,20],[155,155,10],[365,155,30]].map(([x,y,key]) => <g key={key}><circle cx={x} cy={y} r="31"/><text x={x} y={y + 5}>{key}</text><text className="bf-label" x={x + 27} y={y - 24}>BF 0</text></g>)}
  </svg>
);

export const TreeLearningLab: React.FC = () => {
  const [topic, setTopic] = useState<Topic>('avl');
  const [stage, setStage] = useState<Stage>('learn');
  const [caseIndex, setCaseIndex] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);
  const [values, setValues] = useState('30, 20, 10');
  const [playing, setPlaying] = useState(false);
  const [showWorking, setShowWorking] = useState(false);
  const parsed = useMemo(() => values.split(',').map(v => Number(v.trim())).filter(Number.isFinite).slice(0, 12), [values]);
  const selectTopic = (next: Topic) => { setTopic(next); setStage('learn'); setAnswer(null); setShowWorking(false); };
  const changeCase = (offset: number) => { setCaseIndex(index => (index + offset + AVL_CASES.length) % AVL_CASES.length); setAnswer(null); setShowWorking(false); };
  useEffect(()=>{if(!playing||topic!=='avl'||stage!=='identify')return;const timer=window.setInterval(()=>{setCaseIndex(index=>(index+1)%AVL_CASES.length);setAnswer(null);setShowWorking(false)},2600);return()=>window.clearInterval(timer)},[playing,topic,stage]);

  return <section className="tree-lab-page" aria-labelledby="tree-lab-title">
    <header className="tree-lab-hero"><span><FlaskConical size={16}/> INTERACTIVE SEARCH-TREE LAB</span><h2 id="tree-lab-title">Understand the rules before moving the nodes.</h2><p>Learn how to identify AVL and B-trees, walk through every major operation, and then practise with immediate structural feedback.</p></header>
    <div className="tree-topic-switch"><button className={topic === 'avl' ? 'active' : ''} onClick={() => selectTopic('avl')}>AVL Trees</button><button className={topic === 'btree' ? 'active' : ''} onClick={() => selectTopic('btree')}>B-Trees</button></div>
    <nav className="tree-stage-nav" aria-label="Learning stages">{(['learn','identify','practice'] as Stage[]).map((item, index) => <button key={item} className={stage === item ? 'active' : ''} onClick={() => setStage(item)}><b>{index + 1}</b>{item === 'learn' ? 'Learn the rules' : item === 'identify' ? 'Identify & solve' : 'Practice lab'}</button>)}</nav>

    {stage === 'learn' && <div className="tree-lesson-grid">
      <article className="tree-main-lesson"><span className="lesson-kicker"><BookOpen size={15}/> VISUAL INTRODUCTION</span><h3>{topic === 'avl' ? 'An AVL tree is a BST that repairs its own height.' : 'A B-tree stores several sorted keys in each balanced node.'}</h3>{topic === 'avl' ? <AvlDiagram/> : <BTreeDiagram/>}<p>{topic === 'avl' ? 'Every node follows BST ordering, and the height difference between its left and right subtrees is at most one. After insertion or deletion, rotations repair the first unbalanced ancestor.' : 'Every node stays within its key-capacity rules, separator keys route searches, and every leaf remains at the same depth. Splitting handles overflow; borrowing and merging repair deletion underflow.'}</p></article>
      <aside className="tree-rule-list"><h3>How to identify it</h3>{(topic === 'avl' ? ['Confirm BST ordering','Calculate left and right heights','Compute balance factor: left − right','Find the first node outside −1…+1','Classify LL, RR, LR, or RL'] : ['Check keys are sorted inside each node','Check minimum and maximum key counts','Confirm children = keys + 1','Verify separator key ranges','Confirm every leaf has equal depth']).map(rule => <div key={rule}><CheckCircle2 size={17}/><span>{rule}</span></div>)}<button className="btn btn-primary" onClick={() => setStage('identify')}>Start guided identification <ArrowRight size={17}/></button></aside>
      <article className="operation-guide"><h3>Core operations — live node playback</h3><div className="operation-cards">{(topic === 'avl' ? [['Search','Follow BST comparisons without rotations.'],['Insert','Insert as BST, update heights, rotate if needed.'],['Delete','Delete as BST, then rebalance every affected ancestor.'],['Rotate','Use single or double rotation based on the heavy path.']] : [['Search','Choose the child range between separator keys.'],['Insert','Insert into a leaf; split full nodes and promote the median.'],['Delete','Remove, borrow from a sibling, or merge before descending.'],['Split','Promote the median and divide keys and children.']]).map(([title,text]) => <div key={title}><strong>{title}</strong><p>{text}</p></div>)}</div>{topic==='avl'&&<TreeOperationPlayer values={[30,20,40,10,25,5]} />}</article>
    </div>}

    {stage === 'identify' && <div className="identify-panel">{topic === 'avl' ? <>
      <div className="identify-question"><span>CASE {caseIndex + 1} OF 4 · IDENTIFY FIRST</span><h3>Insert {AVL_CASES[caseIndex].sequence}. Which imbalance occurs?</h3><AvlDiagram values={AVL_CASES[caseIndex].nodes}/><div className="lesson-playback"><button onClick={()=>changeCase(-1)} aria-label="Previous case"><ArrowLeft/></button><button className="play" onClick={()=>setPlaying(value=>!value)}>{playing?<Pause/>:<Play/>}{playing?'Pause cases':'Auto cases'}</button><button onClick={()=>changeCase(1)} aria-label="Next case"><ArrowRight/></button><span><b>Your challenge</b>Choose a case to unlock the worked animation.</span></div></div>
      <div className="answer-grid">{AVL_CASES.map(item => <button key={item.name} onClick={() => { setAnswer(item.name); setShowWorking(true); setPlaying(false); }} className={answer === item.name ? (item.name === AVL_CASES[caseIndex].name ? 'correct' : 'wrong') : ''}>{item.name}<small>{item.fix}</small></button>)}</div>
      {answer && <div className={`answer-feedback ${answer === AVL_CASES[caseIndex].name ? 'correct' : 'wrong'}`}>{answer === AVL_CASES[caseIndex].name ? <CheckCircle2/> : <XCircle/>}<span>{answer === AVL_CASES[caseIndex].name ? `Correct. The heavy path is ${AVL_CASES[caseIndex].name}.` : `Your choice was ${answer}; the actual heavy path is ${AVL_CASES[caseIndex].name}. Follow the playback below to see why.`}</span></div>}
      {showWorking && <section className="identify-working" aria-live="polite"><header><span>WORKED SOLUTION · REAL TREE STATE</span><h3>{AVL_CASES[caseIndex].fix}</h3><p>Use Play operation or the arrow controls to inspect every comparison, height update, imbalance, node movement, and final result.</p></header><div className="working-steps"><div><b>1</b><span><strong>Insert as a BST</strong>Place {AVL_CASES[caseIndex].sequence} using smaller-left and larger-right comparisons.</span></div><div><b>2</b><span><strong>Trace upward</strong>Recalculate heights until the first ancestor reaches balance factor +2 or −2.</span></div><div><b>3</b><span><strong>Repair {AVL_CASES[caseIndex].name}</strong>{AVL_CASES[caseIndex].fix}; the playback shows which nodes and edges move.</span></div><div><b>4</b><span><strong>Verify the output</strong>Inorder is 10, 20, 30 and every balance factor returns to the valid range.</span></div></div><TreeOperationPlayer key={`worked-${caseIndex}`} values={AVL_CASES[caseIndex].nodes} initialOperation="rotate" compact/><div className="expected-output"><div><span>EXPECTED OUTPUT</span><h4>Balanced AVL tree</h4><p>Root <b>20</b>, left child <b>10</b>, right child <b>30</b>. Inorder: <code>10 → 20 → 30</code>.</p></div><AvlExpectedOutput/></div></section>}
      <button className="btn btn-primary" onClick={() => changeCase(1)}>Next case <ArrowRight size={16}/></button>
    </> : <><div className="identify-question"><span>BTREE VALIDITY CHECK</span><h3>Why is this a valid minimum-degree-two B-tree?</h3><BTreeDiagram/></div><div className="btree-explanation"><div><CheckCircle2/>Every node has 1–3 keys.</div><div><CheckCircle2/>Each internal node has keys + 1 children.</div><div><CheckCircle2/>Separator ranges are correct.</div><div><CheckCircle2/>All leaves are at the same depth.</div></div><button className="btn btn-primary" onClick={() => setStage('practice')}>Continue to practice <ArrowRight size={16}/></button></> }</div>}

    {stage === 'practice' && <><div className="practice-panel"><div><span className="lesson-kicker"><GitBranch size={15}/> FREE PRACTICE</span><h3>{topic === 'avl' ? 'Build and inspect an AVL insertion sequence' : 'Prepare keys for a degree-two B-tree construction'}</h3><p>Enter unique numbers separated by commas. The full operation workspace will preserve every step for teacher replay.</p><label>Input values<input value={values} onChange={event => setValues(event.target.value)} /></label><div className="practice-actions"><button className="btn btn-primary"><Search size={16}/> Validate structure</button><button className="btn btn-secondary" onClick={() => setValues(topic === 'avl' ? '30, 20, 10' : '10, 20, 30, 40, 50')}><RotateCcw size={16}/> Reset</button></div></div><aside><span>{topic === 'avl' ? <GitBranch/> : <Split/>}</span><strong>{parsed.length} keys ready</strong><p>{parsed.join(' → ') || 'Enter at least one numeric key.'}</p><small>{topic === 'avl' ? 'Watch for the first ancestor whose balance factor becomes ±2.' : 'A node splits when it exceeds three keys at minimum degree two.'}</small></aside></div>{topic==='avl'&&<TreeOperationPlayer values={parsed.length?parsed:[30,20,10]} initialOperation="insert" compact/>}</>}
  </section>;
};
