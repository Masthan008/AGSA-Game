import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const teacher = await prisma.user.upsert({ where: { id: 'seed-teacher' }, update: { username: 'Demo Teacher', role: 'admin' }, create: { id: 'seed-teacher', email: 'teacher@example.test', username: 'Demo Teacher', role: 'admin' } });
  const student = await prisma.user.upsert({ where: { id: 'seed-student' }, update: { username: 'Demo Student', role: 'student' }, create: { id: 'seed-student', email: 'student@example.test', username: 'Demo Student', role: 'student' } });
  const classroom = await prisma.classroom.upsert({ where: { id: 'seed-classroom' }, update: { name: 'ADSA Demo Class', teacherId: teacher.id }, create: { id: 'seed-classroom', name: 'ADSA Demo Class', joinCode: 'ADSADEMO', teacherId: teacher.id } });
  await prisma.classroomMember.upsert({ where: { classroomId_userId: { classroomId: classroom.id, userId: student.id } }, update: {}, create: { classroomId: classroom.id, userId: student.id } });
  await prisma.task.upsert({ where: { userId_levelId: { userId: student.id, levelId: 'level-1-arrays' } }, update: { classroomId: classroom.id, assignedById: teacher.id }, create: { userId: student.id, levelId: 'level-1-arrays', classroomId: classroom.id, assignedById: teacher.id, instructions: 'Complete the first lesson and review its explanation.' } });
  console.log('Seed complete: teacher, student, classroom, membership, and assignment.');
}

main().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => prisma.$disconnect());
