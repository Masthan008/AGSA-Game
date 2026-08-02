import { CodeSnippet } from '../../types';

export const STRING_SNIPPETS: Record<string, CodeSnippet> = {
  trie: {
    title: 'Trie (Prefix Tree)',
    timeComplexity: 'insert O(L) • search O(L)',
    spaceComplexity: 'O(N × L × Alphabet)',
    explanationText:
      'A trie stores strings as shared character prefixes. Each node holds a map of children plus an end-of-word flag. Insert and search only depend on word length L, making it O(L) regardless of how many words are stored.',
    cpp: `#include <unordered_map>
using namespace std;

class TrieNode {
public:
    unordered_map<char, TrieNode*> children;
    bool isEnd = false;
};

class Trie {
    TrieNode* root;

public:
    Trie() : root(new TrieNode()) {}

    void insert(const string& word) {
        TrieNode* node = root;
        for (char c : word) {
            if (!node->children[c])
                node->children[c] = new TrieNode();
            node = node->children[c];
        }
        node->isEnd = true;
    }

    bool search(const string& word) {
        TrieNode* node = root;
        for (char c : word) {
            if (!node->children.count(c)) return false;
            node = node->children[c];
        }
        return node->isEnd;
    }

    bool startsWith(const string& prefix) {
        TrieNode* node = root;
        for (char c : prefix) {
            if (!node->children.count(c)) return false;
            node = node->children[c];
        }
        return true;
    }
};`,
    java: `import java.util.*;

class TrieNode {
    Map<Character, TrieNode> children = new HashMap<>();
    boolean isEnd = false;
}

public class Trie {
    private TrieNode root = new TrieNode();

    public void insert(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            node = node.children.computeIfAbsent(c, k -> new TrieNode());
        }
        node.isEnd = true;
    }

    public boolean search(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            if (!node.children.containsKey(c)) return false;
            node = node.children.get(c);
        }
        return node.isEnd;
    }

    public boolean startsWith(String prefix) {
        TrieNode node = root;
        for (char c : prefix.toCharArray()) {
            if (!node.children.containsKey(c)) return false;
            node = node.children.get(c);
        }
        return true;
    }
}`,
    python: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for c in word:
            if c not in node.children:
                node.children[c] = TrieNode()
            node = node.children[c]
        node.is_end = True

    def search(self, word):
        node = self.root
        for c in word:
            if c not in node.children:
                return False
            node = node.children[c]
        return node.is_end

    def starts_with(self, prefix):
        node = self.root
        for c in prefix:
            if c not in node.children:
                return False
            node = node.children[c]
        return True`,
    javascript: `class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const c of word) {
      if (!node.children.has(c)) node.children.set(c, new TrieNode());
      node = node.children.get(c);
    }
    node.isEnd = true;
  }

  search(word) {
    let node = this.root;
    for (const c of word) {
      if (!node.children.has(c)) return false;
      node = node.children.get(c);
    }
    return node.isEnd;
  }

  startsWith(prefix) {
    let node = this.root;
    for (const c of prefix) {
      if (!node.children.has(c)) return false;
      node = node.children.get(c);
    }
    return true;
  }
}`
  },
  kmp: {
    title: 'KMP Pattern Matching',
    timeComplexity: 'O(N + M)',
    spaceComplexity: 'O(M)',
    explanationText:
      'KMP precomputes the LPS (Longest Proper Prefix which is also Suffix) array for the pattern in O(M). The text scan never backtracks \u2014 on mismatch, it jumps i to lps[i-1] \u2014 guaranteeing linear O(N + M) matching.',
    cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

vector<int> buildLPS(const string& pattern) {
    int m = pattern.size();
    vector<int> lps(m, 0);
    int len = 0;

    for (int i = 1; i < m; i++) {
        while (len > 0 && pattern[i] != pattern[len])
            len = lps[len - 1];
        if (pattern[i] == pattern[len]) len++;
        lps[i] = len;
    }
    return lps;
}

vector<int> kmpSearch(const string& text, const string& pattern) {
    vector<int> lps = buildLPS(pattern);
    vector<int> matches;
    int i = 0, j = 0;
    int n = text.size(), m = pattern.size();

    while (i < n) {
        if (text[i] == pattern[j]) {
            i++;
            j++;
        }
        if (j == m) {
            matches.push_back(i - j);
            j = lps[j - 1];
        } else if (i < n && text[i] != pattern[j]) {
            if (j != 0) j = lps[j - 1];
            else i++;
        }
    }
    return matches;
}`,
    java: `import java.util.*;

public class KMP {
    static int[] buildLPS(String pattern) {
        int m = pattern.length();
        int[] lps = new int[m];
        int len = 0;
        for (int i = 1; i < m; i++) {
            while (len > 0 && pattern.charAt(i) != pattern.charAt(len))
                len = lps[len - 1];
            if (pattern.charAt(i) == pattern.charAt(len)) len++;
            lps[i] = len;
        }
        return lps;
    }

    static List<Integer> kmpSearch(String text, String pattern) {
        int[] lps = buildLPS(pattern);
        List<Integer> matches = new ArrayList<>();
        int i = 0, j = 0;
        int n = text.length(), m = pattern.length();

        while (i < n) {
            if (text.charAt(i) == pattern.charAt(j)) { i++; j++; }
            if (j == m) {
                matches.add(i - j);
                j = lps[j - 1];
            } else if (i < n && text.charAt(i) != pattern.charAt(j)) {
                if (j != 0) j = lps[j - 1];
                else i++;
            }
        }
        return matches;
    }
}`,
    python: `def build_lps(pattern):
    m = len(pattern)
    lps = [0] * m
    length = 0
    for i in range(1, m):
        while length > 0 and pattern[i] != pattern[length]:
            length = lps[length - 1]
        if pattern[i] == pattern[length]:
            length += 1
        lps[i] = length
    return lps

def kmp_search(text, pattern):
    lps = build_lps(pattern)
    matches = []
    i = j = 0
    n, m = len(text), len(pattern)

    while i < n:
        if text[i] == pattern[j]:
            i += 1
            j += 1
        if j == m:
            matches.append(i - j)
            j = lps[j - 1]
        elif i < n and text[i] != pattern[j]:
            if j != 0:
                j = lps[j - 1]
            else:
                i += 1
    return matches`,
    javascript: `function buildLPS(pattern) {
  const m = pattern.length;
  const lps = new Array(m).fill(0);
  let len = 0;
  for (let i = 1; i < m; i++) {
    while (len > 0 && pattern[i] !== pattern[len]) len = lps[len - 1];
    if (pattern[i] === pattern[len]) len++;
    lps[i] = len;
  }
  return lps;
}

function kmpSearch(text, pattern) {
  const lps = buildLPS(pattern);
  const matches = [];
  let i = 0, j = 0;
  const n = text.length, m = pattern.length;

  while (i < n) {
    if (text[i] === pattern[j]) { i++; j++; }
    if (j === m) {
      matches.push(i - j);
      j = lps[j - 1];
    } else if (i < n && text[i] !== pattern[j]) {
      if (j !== 0) j = lps[j - 1];
      else i++;
    }
  }
  return matches;
}`
  },
  suffixarray: {
    title: 'Suffix Array (Radix Sort)',
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(N)',
    explanationText:
      'A suffix array lists all suffixes of a string in sorted order. We build it with doubling + radix sort: sort by the first 2^k characters each round, taking O(log N) rounds at O(N) each \u2014 O(N log N) total. Substring search then runs in O(M log N).',
    cpp: `#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
using namespace std;

vector<int> buildSuffixArray(const string& s) {
    int n = s.size();
    vector<int> sa(n), rank(n), tmp(n);

    for (int i = 0; i < n; i++) sa[i] = i, rank[i] = s[i];

    for (int k = 1; k < n; k *= 2) {
        auto cmp = [&](int a, int b) {
            if (rank[a] != rank[b]) return rank[a] < rank[b];
            int ra = a + k < n ? rank[a + k] : -1;
            int rb = b + k < n ? rank[b + k] : -1;
            return ra < rb;
        };
        sort(sa.begin(), sa.end(), cmp);
        tmp[sa[0]] = 0;
        for (int i = 1; i < n; i++)
            tmp[sa[i]] = tmp[sa[i - 1]] + (cmp(sa[i - 1], sa[i]) ? 1 : 0);
        rank = tmp;
    }
    return sa;
}`,
    java: `import java.util.*;

public class SuffixArray {
    static int[] buildSuffixArray(String s) {
        int n = s.length();
        Integer[] sa = new Integer[n];
        int[] rank = new int[n];

        for (int i = 0; i < n; i++) { sa[i] = i; rank[i] = s.charAt(i); }

        for (int k = 1; k < n; k *= 2) {
            final int K = k;
            Comparator<Integer> cmp = (a, b) -> {
                if (rank[a] != rank[b]) return rank[a] - rank[b];
                int ra = a + K < n ? rank[a + K] : -1;
                int rb = b + K < n ? rank[b + K] : -1;
                return ra - rb;
            };
            Arrays.sort(sa, cmp);
            int[] tmp = new int[n];
            tmp[sa[0]] = 0;
            for (int i = 1; i < n; i++)
                tmp[sa[i]] = tmp[sa[i - 1]] + (cmp.compare(sa[i - 1], sa[i]) < 0 ? 1 : 0);
            rank = tmp;
        }
        int[] result = new int[n];
        for (int i = 0; i < n; i++) result[i] = sa[i];
        return result;
    }
}`,
    python: `def build_suffix_array(s):
    n = len(s)
    sa = list(range(n))
    rank = [ord(c) for c in s]

    k = 1
    while k < n:
        def cmp(i):
            return (rank[i], rank[i + k] if i + k < n else -1)

        sa.sort(key=cmp)
        tmp = [0] * n
        tmp[sa[0]] = 0
        for i in range(1, n):
            tmp[sa[i]] = tmp[sa[i - 1]] + (1 if cmp(sa[i - 1]) != cmp(sa[i]) else 0)
        rank = tmp
        k *= 2
    return sa`,
    javascript: `function buildSuffixArray(s) {
  const n = s.length;
  let sa = Array.from({ length: n }, (_, i) => i);
  let rank = [...s].map((c) => c.charCodeAt(0));

  for (let k = 1; k < n; k *= 2) {
    const cmp = (a, b) => {
      if (rank[a] !== rank[b]) return rank[a] - rank[b];
      const ra = a + k < n ? rank[a + k] : -1;
      const rb = b + k < n ? rank[b + k] : -1;
      return ra - rb;
    };
    sa.sort(cmp);
    const tmp = new Array(n).fill(0);
    for (let i = 1; i < n; i++) {
      tmp[sa[i]] = tmp[sa[i - 1]] + (cmp(sa[i - 1], sa[i]) < 0 ? 1 : 0);
    }
    rank = tmp;
  }
  return sa;
}`
  },
  rabinkarp: {
    title: 'Rabin-Karp Rolling Hash',
    timeComplexity: 'O(N + M) average',
    spaceComplexity: 'O(1)',
    explanationText:
      'Rabin-Karp hashes the pattern and every window of the text with a rolling hash: subtract the outgoing character, multiply by base, add the incoming character \u2014 each shift in O(1). Average-case O(N + M), worst-case O(N·M) on hash collisions.',
    cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

vector<int> rabinKarp(const string& text, const string& pattern) {
    const int BASE = 256, MOD = 1e9 + 7;
    int n = text.size(), m = pattern.size();
    if (m > n) return {};

    long long patHash = 0, txtHash = 0, power = 1;
    for (int i = 0; i < m; i++) {
        patHash = (patHash * BASE + pattern[i]) % MOD;
        txtHash = (txtHash * BASE + text[i]) % MOD;
        power = (power * BASE) % MOD;
    }

    vector<int> matches;
    for (int i = 0; i <= n - m; i++) {
        if (patHash == txtHash && text.substr(i, m) == pattern)
            matches.push_back(i);

        if (i < n - m) {
            txtHash = (txtHash * BASE - text[i] * power + text[i + m]) % MOD;
            if (txtHash < 0) txtHash += MOD;
        }
    }
    return matches;
}`,
    java: `import java.util.*;

public class RabinKarp {
    static List<Integer> rabinKarp(String text, String pattern) {
        final int BASE = 256, MOD = 1_000_000_007;
        int n = text.length(), m = pattern.length();
        if (m > n) return new ArrayList<>();

        long patHash = 0, txtHash = 0, power = 1;
        for (int i = 0; i < m; i++) {
            patHash = (patHash * BASE + pattern.charAt(i)) % MOD;
            txtHash = (txtHash * BASE + text.charAt(i)) % MOD;
            power = (power * BASE) % MOD;
        }

        List<Integer> matches = new ArrayList<>();
        for (int i = 0; i <= n - m; i++) {
            if (patHash == txtHash && text.substring(i, i + m).equals(pattern))
                matches.add(i);

            if (i < n - m) {
                txtHash = (txtHash * BASE - text.charAt(i) * power + text.charAt(i + m)) % MOD;
                if (txtHash < 0) txtHash += MOD;
            }
        }
        return matches;
    }
}`,
    python: `def rabin_karp(text, pattern):
    BASE, MOD = 256, 10**9 + 7
    n, m = len(text), len(pattern)
    if m > n:
        return []

    pat_hash = txt_hash = 0
    power = 1
    for i in range(m):
        pat_hash = (pat_hash * BASE + ord(pattern[i])) % MOD
        txt_hash = (txt_hash * BASE + ord(text[i])) % MOD
        power = (power * BASE) % MOD

    matches = []
    for i in range(n - m + 1):
        if pat_hash == txt_hash and text[i:i + m] == pattern:
            matches.append(i)
        if i < n - m:
            txt_hash = (txt_hash * BASE - ord(text[i]) * power + ord(text[i + m])) % MOD
            if txt_hash < 0:
                txt_hash += MOD
    return matches`,
    javascript: `function rabinKarp(text, pattern) {
  const BASE = 256, MOD = 1e9 + 7;
  const n = text.length, m = pattern.length;
  if (m > n) return [];

  let patHash = 0, txtHash = 0, power = 1;
  for (let i = 0; i < m; i++) {
    patHash = (patHash * BASE + pattern.charCodeAt(i)) % MOD;
    txtHash = (txtHash * BASE + text.charCodeAt(i)) % MOD;
    power = (power * BASE) % MOD;
  }

  const matches = [];
  for (let i = 0; i <= n - m; i++) {
    if (patHash === txtHash && text.substring(i, i + m) === pattern) {
      matches.push(i);
    }
    if (i < n - m) {
      txtHash = (txtHash * BASE - text.charCodeAt(i) * power + text.charCodeAt(i + m)) % MOD;
      if (txtHash < 0) txtHash += MOD;
    }
  }
  return matches;
}`
  },
  boyermoore: {
    title: 'Boyer-Moore String Matching',
    timeComplexity: 'O(N/M) average • O(N·M) worst',
    spaceComplexity: 'O(Alphabet)',
    explanationText:
      'Boyer-Moore scans the pattern from right to left and precomputes a bad-character table of the last occurrence of each character. On mismatch, the pattern shifts past the mismatching text character \u2014 giving sub-linear average time on large alphabets.',
    cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

vector<int> boyerMoore(const string& text, const string& pattern) {
    int n = text.size(), m = pattern.size();
    if (m == 0 || m > n) return {};

    vector<int> last(256, -1);
    for (int i = 0; i < m; i++) last[pattern[i]] = i;

    vector<int> matches;
    int shift = 0;
    while (shift <= n - m) {
        int j = m - 1;
        while (j >= 0 && pattern[j] == text[shift + j]) j--;

        if (j < 0) {
            matches.push_back(shift);
            shift += (shift + m < n) ? m - last[text[shift + m]] : 1;
        } else {
            shift += max(1, j - last[text[shift + j]]);
        }
    }
    return matches;
}`,
    java: `import java.util.*;

public class BoyerMoore {
    static List<Integer> boyerMoore(String text, String pattern) {
        int n = text.length(), m = pattern.length();
        if (m == 0 || m > n) return new ArrayList<>();

        int[] last = new int[256];
        Arrays.fill(last, -1);
        for (int i = 0; i < m; i++) last[pattern.charAt(i)] = i;

        List<Integer> matches = new ArrayList<>();
        int shift = 0;
        while (shift <= n - m) {
            int j = m - 1;
            while (j >= 0 && pattern.charAt(j) == text.charAt(shift + j)) j--;

            if (j < 0) {
                matches.add(shift);
                shift += (shift + m < n) ? m - last[text.charAt(shift + m)] : 1;
            } else {
                shift += Math.max(1, j - last[text.charAt(shift + j)]);
            }
        }
        return matches;
    }
}`,
    python: `def boyer_moore(text, pattern):
    n, m = len(text), len(pattern)
    if m == 0 or m > n:
        return []

    last = {}
    for i, c in enumerate(pattern):
        last[c] = i

    matches = []
    shift = 0
    while shift <= n - m:
        j = m - 1
        while j >= 0 and pattern[j] == text[shift + j]:
            j -= 1

        if j < 0:
            matches.append(shift)
            if shift + m < n:
                shift += m - last.get(text[shift + m], -1)
            else:
                shift += 1
        else:
            shift += max(1, j - last.get(text[shift + j], -1))
    return matches`,
    javascript: `function boyerMoore(text, pattern) {
  const n = text.length, m = pattern.length;
  if (m === 0 || m > n) return [];

  const last = new Array(256).fill(-1);
  for (let i = 0; i < m; i++) last[pattern.charCodeAt(i)] = i;

  const matches = [];
  let shift = 0;
  while (shift <= n - m) {
    let j = m - 1;
    while (j >= 0 && pattern[j] === text[shift + j]) j--;

    if (j < 0) {
      matches.push(shift);
      shift += shift + m < n ? m - last[text.charCodeAt(shift + m)] : 1;
    } else {
      shift += Math.max(1, j - last[text.charCodeAt(shift + j)]);
    }
  }
  return matches;
}`
  },
  suffixautomaton: {
    title: 'Suffix Automaton',
    timeComplexity: 'build O(N)',
    spaceComplexity: 'O(N × Alphabet)',
    explanationText:
      'A suffix automaton is the minimal DFA accepting all substrings of a string. Each character is appended in amortized O(1) using state links and cloning, so the whole automaton builds in O(N) and answers substring / LCS queries in linear time.',
    cpp: `#include <iostream>
#include <vector>
#include <map>
using namespace std;

struct State {
    int len, link;
    map<char, int> next;
    State() : len(0), link(-1) {}
};

class SuffixAutomaton {
    vector<State> st;
    int last;

public:
    SuffixAutomaton() : st(1), last(0) {}

    void extend(char c) {
        int cur = st.size();
        st.push_back(State());
        st[cur].len = st[last].len + 1;

        int p = last;
        while (p != -1 && !st[p].next.count(c)) {
            st[p].next[c] = cur;
            p = st[p].link;
        }

        if (p == -1) {
            st[cur].link = 0;
        } else {
            int q = st[p].next[c];
            if (st[p].len + 1 == st[q].len) {
                st[cur].link = q;
            } else {
                int clone = st.size();
                st.push_back(st[q]);
                st[clone].len = st[p].len + 1;
                while (p != -1 && st[p].next[c] == q) {
                    st[p].next[c] = clone;
                    p = st[p].link;
                }
                st[q].link = st[cur].link = clone;
            }
        }
        last = cur;
    }

    bool contains(const string& text) {
        int cur = 0;
        for (char c : text) {
            if (!st[cur].next.count(c)) return false;
            cur = st[cur].next[c];
        }
        return true;
    }
};`,
    java: `import java.util.*;

public class SuffixAutomaton {
    static class State {
        int len, link = -1;
        Map<Character, Integer> next = new HashMap<>();
    }

    List<State> st = new ArrayList<>();
    int last;

    SuffixAutomaton() {
        st.add(new State());
        last = 0;
    }

    void extend(char c) {
        int cur = st.size();
        st.add(new State());
        st.get(cur).len = st.get(last).len + 1;

        int p = last;
        while (p != -1 && !st.get(p).next.containsKey(c)) {
            st.get(p).next.put(c, cur);
            p = st.get(p).link;
        }

        if (p == -1) {
            st.get(cur).link = 0;
        } else {
            int q = st.get(p).next.get(c);
            if (st.get(p).len + 1 == st.get(q).len) {
                st.get(cur).link = q;
            } else {
                int clone = st.size();
                st.add(st.get(q));
                st.get(clone).len = st.get(p).len + 1;
                while (p != -1 && st.get(p).next.get(c) == q) {
                    st.get(p).next.put(c, clone);
                    p = st.get(p).link;
                }
                st.get(q).link = st.get(cur).link = clone;
            }
        }
        last = cur;
    }

    boolean contains(String text) {
        int cur = 0;
        for (char c : text.toCharArray()) {
            if (!st.get(cur).next.containsKey(c)) return false;
            cur = st.get(cur).next.get(c);
        }
        return true;
    }
}`,
    python: `class State:
    def __init__(self):
        self.len = 0
        self.link = -1
        self.next = {}

class SuffixAutomaton:
    def __init__(self):
        self.st = [State()]
        self.last = 0

    def extend(self, c):
        cur = len(self.st)
        self.st.append(State())
        self.st[cur].len = self.st[self.last].len + 1

        p = self.last
        while p != -1 and c not in self.st[p].next:
            self.st[p].next[c] = cur
            p = self.st[p].link

        if p == -1:
            self.st[cur].link = 0
        else:
            q = self.st[p].next[c]
            if self.st[p].len + 1 == self.st[q].len:
                self.st[cur].link = q
            else:
                clone = len(self.st)
                self.st.append(State())
                self.st[clone].len = self.st[p].len + 1
                self.st[clone].next = dict(self.st[q].next)
                self.st[clone].link = self.st[q].link
                while p != -1 and self.st[p].next.get(c) == q:
                    self.st[p].next[c] = clone
                    p = self.st[p].link
                self.st[q].link = self.st[cur].link = clone
        self.last = cur

    def contains(self, text):
        cur = 0
        for c in text:
            if c not in self.st[cur].next:
                return False
            cur = self.st[cur].next[c]
        return True`,
    javascript: `class State {
  constructor() {
    this.len = 0;
    this.link = -1;
    this.next = new Map();
  }
}

class SuffixAutomaton {
  constructor() {
    this.st = [new State()];
    this.last = 0;
  }

  extend(c) {
    const cur = this.st.length;
    this.st.push(new State());
    this.st[cur].len = this.st[this.last].len + 1;

    let p = this.last;
    while (p !== -1 && !this.st[p].next.has(c)) {
      this.st[p].next.set(c, cur);
      p = this.st[p].link;
    }

    if (p === -1) {
      this.st[cur].link = 0;
    } else {
      const q = this.st[p].next.get(c);
      if (this.st[p].len + 1 === this.st[q].len) {
        this.st[cur].link = q;
      } else {
        const clone = this.st.length;
        this.st.push(new State());
        this.st[clone].len = this.st[p].len + 1;
        this.st[clone].next = new Map(this.st[q].next);
        this.st[clone].link = this.st[q].link;
        while (p !== -1 && this.st[p].next.get(c) === q) {
          this.st[p].next.set(c, clone);
          p = this.st[p].link;
        }
        this.st[q].link = this.st[cur].link = clone;
      }
    }
    this.last = cur;
  }

  contains(text) {
    let cur = 0;
    for (const c of text) {
      if (!this.st[cur].next.has(c)) return false;
      cur = this.st[cur].next.get(c);
    }
    return true;
  }
}`
  }
};
