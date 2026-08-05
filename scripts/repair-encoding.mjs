import { readFileSync, writeFileSync } from 'node:fs';

const files = process.argv.slice(2);
if (files.length === 0) throw new Error('Pass one or more UTF-8 text files to repair.');

const replacements = new Map([
  ['Î”Î¦', 'ΔΦ'], ['Â²Â·', '²·'], ['â‚', '₁'], ['â‚‚', '₂'], ['â‚š', 'ₚ'],
  ['â€”', '—'], ['â€“', '–'], ['â€¦', '…'], ['â†’', '→'], ['âˆ’', '−'], ['âˆˆ', '∈'],
  ['âˆš', '√'], ['â‰¤', '≤'], ['â‰¥', '≥'], ['â‰ ', '≠'], ['â‰ˆ', '≈'],
  ['Î£', 'Σ'], ['Î¦', 'Φ'], ['Î©', 'Ω'], ['Î±', 'α'], ['Ã—', '×'],
  ['Â°', '°'], ['Â±', '±'], ['Â²', '²'], ['Â³', '³'], ['Â·', '·'],
]);

for (const file of files) {
  let source = readFileSync(file, 'utf8');
  for (const [broken, corrected] of replacements) source = source.split(broken).join(corrected);
  writeFileSync(file, source, 'utf8');
  console.log(`Repaired UTF-8 text in ${file}`);
}
