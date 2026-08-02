import { CodeSnippet, ProgrammingLanguage } from '../types';

// Semantic code steps produced by animation engines. Each step maps to one or
// more regex patterns; every matching line in the displayed snippet is
// highlighted, so highlighting always matches the actual code on screen.
const STEP_PATTERNS: Record<string, RegExp[]> = {
  'insert:compare': [/\binsert\w*\s*\(/],
  'insert:goLeft': [/key\s*<\s*.*\bkey\b/],
  'insert:goRight': [/key\s*>\s*.*\bkey\b/],
  'insert:create': [/Node\s*\(\s*key\s*\)/],
  'avl:balance': [/\bget_?Balance\s*\(/, /height\s*=\s*1\s*\+\s*(Math\.)?max/],
  'avl:imbalance': [/balance\s*>\s*1/, /balance\s*<\s*-1/, /if\s*\(?\s*balance\s*[<>]/],
  'avl:rotateRight': [/right_?Rotate\s*\(/],
  'avl:rotateLeft': [/left_?Rotate\s*\(/],
  'search:compare': [/\bsearch\w*\s*\(/],
  'search:goLeft': [/key\s*<\s*.*\bkey\b/],
  'search:goRight': [/key\s*>\s*.*\bkey\b/],
  'search:found': [/key\s*==\s*.*\bkey\b/],
  'search:notfound': [/return\s+[Ff]alse/],
  'delete:compare': [/\bdelete\w*Node\s*\(/],
  'delete:goLeft': [/key\s*<\s*.*\bkey\b/],
  'delete:goRight': [/key\s*>\s*.*\bkey\b/],
  'delete:remove': [/\bdelete\w*Node\s*\(/, /delete\s+root/],
  'delete:successor': [/min_?\w*Node\s*\(/, /min_value_node\s*\(/],
  'insert:done': [/\breturn\s+(root|node)\b/],
};

const LANGUAGES: ProgrammingLanguage[] = ['cpp', 'java', 'python', 'javascript', 'csharp', 'go', 'rust', 'c'];

const cache = new Map<string, Partial<Record<ProgrammingLanguage, number[]>>>();

/**
 * Resolves the line numbers (1-based, as shown in the code viewer) that should
 * be highlighted for a given semantic code step, for every language present in
 * the snippet. Returns an empty object when the step is unknown or matches
 * nothing.
 */
export function resolveCodeHighlights(
  codeStep: string | undefined,
  snippet: CodeSnippet
): Partial<Record<ProgrammingLanguage, number[]>> {
  if (!codeStep) return {};
  const patterns = STEP_PATTERNS[codeStep];
  if (!patterns) return {};

  const cacheKey = `${snippet.title}|${codeStep}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const result: Partial<Record<ProgrammingLanguage, number[]>> = {};
  for (const lang of LANGUAGES) {
    const code = snippet[lang];
    if (typeof code !== 'string') continue;
    const lines = code.split('\n');
    const hits: number[] = [];
    lines.forEach((line, idx) => {
      if (patterns.some(p => p.test(line))) hits.push(idx + 1);
    });
    if (hits.length > 0) result[lang] = hits;
  }

  cache.set(cacheKey, result);
  return result;
}
