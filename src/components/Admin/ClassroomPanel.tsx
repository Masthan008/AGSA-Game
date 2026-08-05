import React, { useEffect, useState } from 'react';
import { BookOpenCheck, Copy, Download, Plus, School, UserPlus } from 'lucide-react';
import { LEVEL_TOPICS } from '../../data/levelsData';
import { addClassroomMember, assignClassroomTasks, createTeacherClassroom, fetchClassroomReport, fetchTeacherClassrooms } from '../../services/api';

interface ClassroomPanelProps { students: { id: string; username: string }[] }

export const ClassroomPanel: React.FC<ClassroomPanelProps> = ({ students }) => {
  const [rooms, setRooms] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [levelId, setLevelId] = useState(LEVEL_TOPICS[0].id);
  const [dueAt, setDueAt] = useState('');
  const [message, setMessage] = useState('');
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
      </article>)}
      {rooms.length === 0 && <div style={{ color: 'var(--text-muted)', fontSize: '.8rem' }}>No classrooms yet. Create the first learning group above.</div>}
    </div>
  </section>;
};
