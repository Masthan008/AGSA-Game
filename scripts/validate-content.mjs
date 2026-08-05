import { readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const read = path => readFileSync(join(root, path), 'utf8');
const fail = message => errors.push(message);
const errors = [];
const warnings = [];

const levelsSource = read('src/data/levelsData.ts');
const quizSource = read('src/data/quizData.ts');
const theorySource = readdirSync(join(root, 'src/data'))
  .filter(name => name.endsWith('.ts'))
  .map(name => read(`src/data/${name}`))
  .join('\n');
const templateDir = join(root, 'src/data/codeTemplates');
const visualizerRegistrySource = read('src/algorithms/visualizerRegistry.ts');
const templateSource = readdirSync(templateDir)
  .filter(name => name.endsWith('.ts'))
  .map(name => read(`src/data/codeTemplates/${name}`))
  .join('\n');

const levelBlocks = [...levelsSource.matchAll(/id:\s*'(level-[^']+)'[\s\S]*?levelNumber:\s*(\d+)[\s\S]*?algorithmKey:\s*'([^']+)'/g)]
  .map(match => ({ id: match[1], number: Number(match[2]), algorithmKey: match[3] }));
const questionBlocks = [...quizSource.matchAll(/\{\s*\n\s*id:\s*'([^']+)'[\s\S]*?levelId:\s*'([^']+)'[\s\S]*?correctAnswerIndex:\s*(\d+)/g)]
  .map(match => ({ id: match[1], levelId: match[2], correctAnswerIndex: Number(match[3]) }));

const duplicates = values => [...new Set(values.filter((value, index) => values.indexOf(value) !== index))];
const levelIds = levelBlocks.map(level => level.id);
const levelNumbers = levelBlocks.map(level => level.number);
const questionIds = questionBlocks.map(question => question.id);

if (levelBlocks.length !== 38) fail(`Expected 38 levels, found ${levelBlocks.length}.`);
if (duplicates(levelIds).length) fail(`Duplicate level IDs: ${duplicates(levelIds).join(', ')}`);
if (duplicates(levelNumbers).length) fail(`Duplicate level numbers: ${duplicates(levelNumbers).join(', ')}`);
if (duplicates(questionIds).length) fail(`Duplicate question IDs: ${duplicates(questionIds).join(', ')}`);

const expectedNumbers = Array.from({ length: levelBlocks.length }, (_, index) => index + 1);
if (expectedNumbers.some((number, index) => [...levelNumbers].sort((a, b) => a - b)[index] !== number)) {
  fail('Level numbers must be contiguous and start at 1.');
}

for (const question of questionBlocks) {
  if (!levelIds.includes(question.levelId)) fail(`Question ${question.id} references missing ${question.levelId}.`);
  if (question.correctAnswerIndex < 0 || question.correctAnswerIndex > 3) {
    fail(`Question ${question.id} has invalid answer index ${question.correctAnswerIndex}.`);
  }
}

for (const level of levelBlocks) {
  if (!questionBlocks.some(question => question.levelId === level.id)) {
    fail(`${level.id} has no dedicated quiz questions.`);
  }
  const keyPattern = new RegExp(`\\b${level.algorithmKey}\\s*:`);
  if (!keyPattern.test(theorySource)) warnings.push(`${level.algorithmKey}: theory uses a fallback or is absent.`);
  if (!keyPattern.test(templateSource)) warnings.push(`${level.algorithmKey}: code templates use a fallback or are absent.`);
  if (!keyPattern.test(visualizerRegistrySource)) fail(`${level.algorithmKey}: no dedicated visualizer registry entry.`);
}

const mojibakePattern = /(?:â€|â†|âˆ|Ã.|ðŸ|Â·|â˜)/;
for (const path of ['src', 'backend/src']) {
  const scan = directory => {
    for (const entry of readdirSync(join(root, directory), { withFileTypes: true })) {
      const relative = join(directory, entry.name);
      if (entry.isDirectory()) scan(relative);
      else if (/\.(?:ts|tsx|css)$/.test(entry.name) && mojibakePattern.test(read(relative))) {
        warnings.push(`${relative}: contains probable mojibake text.`);
      }
    }
  };
  scan(path);
}

console.log(`Content audit: ${levelBlocks.length} levels, ${questionBlocks.length} detailed quiz questions.`);
for (const warning of [...new Set(warnings)]) console.warn(`WARN: ${warning}`);
if (errors.length) {
  for (const error of errors) console.error(`ERROR: ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Content audit passed with ${new Set(warnings).size} warning(s).`);
}
