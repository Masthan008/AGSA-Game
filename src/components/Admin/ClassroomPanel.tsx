import React, { useEffect, useState } from 'react';
import { BookOpenCheck, BrainCircuit, Copy, Download, GitBranch, Plus, School, UserPlus } from 'lucide-react';
import { LEVEL_TOPICS } from '../../data/levelsData';
import { addClassroomMember, assignClassroomTasks, createTeacherClassroom, createTreeAssignment, fetchClassroomReport, fetchStudentWeakSkills, fetchTeacherClassrooms } from '../../services/api';

interface ClassroomPanelProps { students: { id: string; username: string }[] }

export const ClassroomPanel: React.FC<ClassroomPanelProps> = ({ students }) => {
  const [rooms, setRooms] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [levelId, setLevelId] = useState(LEVEL_TOPICS[0].id);
  const [dueAt, setDueAt] = useState('');
  const [message, setMessage] = useState('');
  const [treeTopic, setTreeTopic] = useState<'avl'|'btree'>('avl');
  const [treeOperation, setTreeOperation] = useState('construct');
  const [treeValues, setTreeValues] = useState('30,20,40,10,25');
  const [weakness, setWeakness] = useState<any[]|null>(null);
  const [recentSubmissions, setRecentSubmissions] = useState<any[]>([]);
  const [replayId, setReplayId] = useState<string|null>(null);
  const load = () => fetchTeacherClassrooms().then(setRooms);
  useEffect(() => { void load(); }, []);

  const create = async () => {
    if (!name.trim()) return;
    if (await createTeacherClassroom(name.trim())) { setName(''); setMessage('Classroom created'); load(); }
  };
  const exportReport = async (room: any) => {
    const report = await fetchClassroomReport(room.id); if (!report) return;
    const columns = ['username','email','xp','streakDays','levelsCompleted','stars','quizAttempts','quizAccuracy','tasksAssigned','tasksCompleted'];
    const escape = (value: unknown) => `"${String(value ?? '').replace(/"/g, '""')}"`;
    const csv = [columns.join(','), ...report.learners.map((learner:any) => columns.map(column => escape(learner[column])).join(','))].join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = `${room.name.replace(/[^a-z0-9]+/gi,'-').toLowerCase()}-progress.csv`; anchor.click(); URL.revokeObjectURL(url);
  };

  return <section className="card-light" style={{ padding: 20, marginBottom: 20 }}>
    <h3 style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}><School size={18} /> Classrooms</h3>
    <p style={{ color: 'var(--text-muted)', fontSize: '.8rem' }}>Create isolated teaching groups, enroll learners, and assign a topic to the whole class.</p>
    <div style={{ display: 'flex', gap: 8, margin: '12px 0', flexWrap: 'wrap' }}>
      <input value={name} onChange={event => setName(event.target.value)} placeholder="Classroom name" style={{ flex: '1 1 220px' }} />
      <button className="btn btn-primary btn-sm" onClick={create}><Plus size={14} /> Create</button>
    </div>
    {message && <div role="status" style={{ color: '#1B7F37', fontSize: '.78rem', fontWeight: 700, marginBottom: 8 }}>{message}</div>}
    <div style={{ display: 'grid', gap: 10 }}>
      {rooms.map(room => <article key={room.id} style={{ border: '1px solid var(--border-hairline)', borderRadius: 12, padding: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
          <strong>{room.name}</strong>
          <div style={{ display: 'flex', gap: 6 }}><button className="btn btn-secondary btn-sm" onClick={() => exportReport(room)}><Download size={13} /> CSV</button><button className="btn btn-secondary btn-sm" onClick={() => navigator.clipboard?.writeText(room.joinCode)}><Copy size={13} /> Code {room.joinCode}</button></div>
        </div>
        <p style={{ fontSize: '.75rem', color: 'var(--text-muted)' }}>{room.members.length} learners · {room._count?.tasks || 0} assigned tasks</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(150px,1fr) auto', gap: 6, marginBottom: 8 }}>
          <select value={studentId} onChange={event => setStudentId(event.target.value)}><option value="">Choose learner</option>{students.map(student => <option key={student.id} value={student.id}>{student.username}</option>)}</select>
          <button className="btn btn-secondary btn-sm" disabled={!studentId} onClick={async () => { if (await addClassroomMember(room.id, studentId)) { setMessage('Learner enrolled'); load(); } }}><UserPlus size={13} /> Enroll</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(180px,1fr) minmax(130px,.5fr) auto', gap: 6 }}>
          <select value={levelId} onChange={event => setLevelId(event.target.value)}>{LEVEL_TOPICS.map(level => <option key={level.id} value={level.id}>L{level.levelNumber} · {level.title}</option>)}</select>
          <input type="date" value={dueAt} onChange={event => setDueAt(event.target.value)} aria-label="Due date" />
          <button className="btn btn-primary btn-sm" disabled={room.members.length === 0} onClick={async () => { if (await assignClassroomTasks(room.id, [levelId], dueAt ? new Date(`${dueAt}T23:59:59`).toISOString() : undefined)) { setMessage('Class assignment published'); load(); } }}><BookOpenCheck size={13} /> Assign</button>
        </div>
        <div className="teacher-tree-builder">
          <div className="teacher-tree-title"><GitBranch size={16}/><div><strong>Tree virtual-lab work</strong><small>Assign construction, insertion, deletion, identification, or repair.</small></div></div>
          <div className="teacher-tree-fields">
            <select value={treeTopic} onChange={event=>setTreeTopic(event.target.value as 'avl'|'btree')}><option value="avl">AVL Tree</option><option value="btree">B-Tree (degree 2)</option></select>
            <select value={treeOperation} onChange={event=>setTreeOperation(event.target.value)}>{['construct','search','insert','delete','identify','repair'].map(value=><option key={value} value={value}>{value[0].toUpperCase()+value.slice(1)}</option>)}</select>
            <input value={treeValues} onChange={event=>setTreeValues(event.target.value)} aria-label="Initial tree values" placeholder="30,20,40,10,25"/>
            <button className="btn btn-primary btn-sm" disabled={!studentId} onClick={async()=>{const values=treeValues.split(',').map(v=>Number(v.trim())).filter(Number.isFinite);const created=await createTreeAssignment({studentId,classroomId:room.id,topic:treeTopic,operation:treeOperation,initialState:{values},btreeDegree:treeTopic==='btree'?2:undefined,difficulty:'beginner',instructions:`${treeOperation[0].toUpperCase()+treeOperation.slice(1)} the assigned ${treeTopic.toUpperCase()} tree and submit a valid final structure.`,dueAt:dueAt?new Date(`${dueAt}T23:59:59`).toISOString():null,maxAttempts:3,hintsAllowed:true,requiredScore:70,xpReward:40});setMessage(created?'Tree-lab assignment published':'Could not publish tree assignment')}}><BookOpenCheck size={13}/> Assign lab</button>
          </div>
          <button className="btn btn-secondary btn-sm" disabled={!studentId} onClick={async()=>{const result=await fetchStudentWeakSkills(studentId);setWeakness(result?.weakSkills||[]);setRecentSubmissions(result?.recentSubmissions||[]);setMessage(result?'Learner skill report loaded':'Learner must belong to this classroom')}}><BrainCircuit size={14}/> Inspect learner weaknesses</button>
          {weakness&&<div className="weak-skill-list">{weakness.length===0?<span>No skills below 70% mastery yet.</span>:weakness.map(skill=><div key={`${skill.topic}-${skill.skillKey}`}><strong>{skill.topic.toUpperCase()} · {skill.skillKey.replace(/-/g,' ')}</strong><span>{Math.round(skill.mastery)}% mastery · {skill.correct}/{skill.attempts} correct · {skill.hintsUsed} hints</span></div>)}</div>}
          {recentSubmissions.length>0&&<div className="submission-replays"><strong>Recent work and operation replay</strong>{recentSubmissions.map(submission=><article key={submission.id}><button onClick={()=>setReplayId(replayId===submission.id?null:submission.id)}><span>{submission.assignment.topic.toUpperCase()} · {submission.assignment.operation}</span><em>{submission.status} · {submission.score}% · attempt {submission.attemptNumber}</em></button>{replayId===submission.id&&<ol>{submission.steps.length?submission.steps.map((step:any)=><li key={step.id}><b>Step {step.sequence+1}: {step.operation}</b><span>{step.skillKey?.replace(/-/g,' ')||'tree operation'} · {step.correct===false?'needs review':'recorded'}</span></li>):<li><span>No individual steps were captured for this submission.</span></li>}</ol>}</article>)}</div>}
        </div>
      </article>)}
      {rooms.length === 0 && <div style={{ color: 'var(--text-muted)', fontSize: '.8rem' }}>No classrooms yet. Create the first learning group above.</div>}
    </div>
  </section>;
};
