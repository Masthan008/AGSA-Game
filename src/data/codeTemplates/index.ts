import { CodeSnippet } from '../../types';
import { TREE_SNIPPETS } from './trees';
import { TREE_ADVANCED_SNIPPETS } from './treesAdvanced';
import { GRAPH_SNIPPETS } from './graphs';
import { DP_SNIPPETS } from './dp';
import { STRING_SNIPPETS } from './strings';
import { ADVANCED_SNIPPETS } from './advanced';
import { CURRICULUM_EXPANSION_SNIPPETS } from './curriculumExpansion';

export const CODE_TEMPLATES: Record<string, CodeSnippet> = {
  ...TREE_SNIPPETS,
  ...TREE_ADVANCED_SNIPPETS,
  ...GRAPH_SNIPPETS,
  ...DP_SNIPPETS,
  ...STRING_SNIPPETS,
  ...ADVANCED_SNIPPETS,
  ...CURRICULUM_EXPANSION_SNIPPETS,
};
