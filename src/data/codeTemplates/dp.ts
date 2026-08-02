import { CodeSnippet } from '../../types';

export const DP_SNIPPETS: Record<string, CodeSnippet> = {
  knapsack: {
    title: '0/1 Knapsack (Dynamic Programming)',
    timeComplexity: 'O(N × W)',
    spaceComplexity: 'O(N × W)',
    explanationText:
      'dp[i][w] = max profit using a subset of the first i items under weight capacity w. Each cell compares excluding the item (dp[i-1][w]) with including it (value + dp[i-1][w-wt]). The 2D table makes the O(N\u00d7W) complexity explicit.',
    cpp: `#include <iostream>
#include <vector>
using namespace std;

int knapsack(int W, const vector<int>& wt, const vector<int>& val) {
    int n = wt.size();
    vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0));

    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            if (wt[i - 1] <= w) {
                dp[i][w] = max(dp[i - 1][w],
                               val[i - 1] + dp[i - 1][w - wt[i - 1]]);
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    return dp[n][W];
}`,
    java: `public class Knapsack {
    static int knapsack(int W, int[] wt, int[] val) {
        int n = wt.length;
        int[][] dp = new int[n + 1][W + 1];

        for (int i = 1; i <= n; i++) {
            for (int w = 0; w <= W; w++) {
                if (wt[i - 1] <= w) {
                    dp[i][w] = Math.max(dp[i - 1][w],
                                        val[i - 1] + dp[i - 1][w - wt[i - 1]]);
                } else {
                    dp[i][w] = dp[i - 1][w];
                }
            }
        }
        return dp[n][W];
    }
}`,
    python: `def knapsack(W, wt, val):
    n = len(wt)
    dp = [[0] * (W + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        for w in range(W + 1):
            if wt[i - 1] <= w:
                dp[i][w] = max(dp[i - 1][w],
                               val[i - 1] + dp[i - 1][w - wt[i - 1]])
            else:
                dp[i][w] = dp[i - 1][w]
    return dp[n][W]`,
    javascript: `function knapsack(W, wt, val) {
  const n = wt.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(W + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= W; w++) {
      if (wt[i - 1] <= w) {
        dp[i][w] = Math.max(
          dp[i - 1][w],
          val[i - 1] + dp[i - 1][w - wt[i - 1]]
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }
  return dp[n][W];
}`
  },
  lcs: {
    title: 'Longest Common Subsequence (LCS)',
    timeComplexity: 'O(N × M)',
    spaceComplexity: 'O(N × M)',
    explanationText:
      'dp[i][j] = length of LCS of the first i chars of string A and first j chars of string B. If characters match, extend by 1 (dp[i-1][j-1] + 1); otherwise take the max of skipping either character. O(N\u00d7M) for N and M lengths.',
    cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

int lcs(const string& a, const string& b) {
    int n = a.size(), m = b.size();
    vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (a[i - 1] == b[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[n][m];
}

string buildLCS(const string& a, const string& b, const vector<vector<int>>& dp) {
    string result;
    int i = a.size(), j = b.size();
    while (i > 0 && j > 0) {
        if (a[i - 1] == b[j - 1]) {
            result = a[i - 1] + result;
            i--; j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }
    return result;
}`,
    java: `public class LCS {
    static int lcs(String a, String b) {
        int n = a.length(), m = b.length();
        int[][] dp = new int[n + 1][m + 1];

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (a.charAt(i - 1) == b.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp[n][m];
    }
}`,
    python: `def lcs(a, b):
    n, m = len(a), len(b)
    dp = [[0] * (m + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        for j in range(1, m + 1):
            if a[i - 1] == b[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[n][m]`,
    javascript: `function lcs(a, b) {
  const n = a.length, m = b.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[n][m];
}`
  },
  matrixchain: {
    title: 'Matrix Chain Multiplication',
    timeComplexity: 'O(N³)',
    spaceComplexity: 'O(N²)',
    explanationText:
      'dp[i][j] = minimum scalar multiplications to multiply matrices i..j. We try every split k between i and j: cost = dp[i][k] + dp[k+1][j] + dims[i-1]·dims[k]·dims[j]. O(N\u00b3) time for N matrices.',
    cpp: `#include <iostream>
#include <vector>
#include <climits>
using namespace std;

int matrixChainOrder(const vector<int>& dims) {
    int n = dims.size() - 1;  // number of matrices
    vector<vector<int>> dp(n, vector<int>(n, 0));

    for (int len = 2; len <= n; len++) {
        for (int i = 0; i <= n - len; i++) {
            int j = i + len - 1;
            dp[i][j] = INT_MAX;
            for (int k = i; k < j; k++) {
                int cost = dp[i][k] + dp[k + 1][j]
                         + dims[i] * dims[k + 1] * dims[j + 1];
                dp[i][j] = min(dp[i][j], cost);
            }
        }
    }
    return dp[0][n - 1];
}`,
    java: `public class MatrixChain {
    static int matrixChainOrder(int[] dims) {
        int n = dims.length - 1;
        int[][] dp = new int[n][n];

        for (int len = 2; len <= n; len++) {
            for (int i = 0; i <= n - len; i++) {
                int j = i + len - 1;
                dp[i][j] = Integer.MAX_VALUE;
                for (int k = i; k < j; k++) {
                    int cost = dp[i][k] + dp[k + 1][j]
                             + dims[i] * dims[k + 1] * dims[j + 1];
                    dp[i][j] = Math.min(dp[i][j], cost);
                }
            }
        }
        return dp[0][n - 1];
    }
}`,
    python: `def matrix_chain_order(dims):
    n = len(dims) - 1
    dp = [[0] * n for _ in range(n)]

    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            dp[i][j] = float("inf")
            for k in range(i, j):
                cost = dp[i][k] + dp[k + 1][j] + dims[i] * dims[k + 1] * dims[j + 1]
                dp[i][j] = min(dp[i][j], cost)
    return dp[0][n - 1]`,
    javascript: `function matrixChainOrder(dims) {
  const n = dims.length - 1;
  const dp = Array.from({ length: n }, () => new Array(n).fill(0));

  for (let len = 2; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1;
      dp[i][j] = Infinity;
      for (let k = i; k < j; k++) {
        const cost = dp[i][k] + dp[k + 1][j] + dims[i] * dims[k + 1] * dims[j + 1];
        dp[i][j] = Math.min(dp[i][j], cost);
      }
    }
  }
  return dp[0][n - 1];
}`
  },
  bitmaskdp: {
    title: 'Bitmask DP (Travelling Salesman)',
    timeComplexity: 'O(2ᴺ × N²)',
    spaceComplexity: 'O(2ᴺ × N)',
    explanationText:
      'dp[mask][i] = minimum cost to visit the set of cities in mask, ending at city i. Each transition visits a new city j \u2248 mask in O(1), over 2\u1d3a masks and N\u00d7N pairs, giving O(2\u1d3aN\u00b2) \u2014 feasible only for small N.',
    cpp: `#include <iostream>
#include <vector>
#include <climits>
using namespace std;

int tsp(const vector<vector<int>>& dist) {
    int n = dist.size();
    int full = (1 << n) - 1;
    vector<vector<int>> dp(1 << n, vector<int>(n, INT_MAX));
    dp[1][0] = 0;  // start at city 0

    for (int mask = 1; mask <= full; mask++) {
        for (int i = 0; i < n; i++) {
            if (!(mask & (1 << i)) || dp[mask][i] == INT_MAX) continue;
            for (int j = 0; j < n; j++) {
                if (mask & (1 << j)) continue;
                dp[mask | (1 << j)][j] = min(dp[mask | (1 << j)][j],
                                             dp[mask][i] + dist[i][j]);
            }
        }
    }

    int ans = INT_MAX;
    for (int i = 1; i < n; i++) {
        if (dp[full][i] != INT_MAX)
            ans = min(ans, dp[full][i] + dist[i][0]);
    }
    return ans;
}`,
    java: `import java.util.*;

public class TSP {
    static int tsp(int[][] dist) {
        int n = dist.length;
        int full = (1 << n) - 1;
        int[][] dp = new int[1 << n][n];
        for (int[] row : dp) Arrays.fill(row, Integer.MAX_VALUE);
        dp[1][0] = 0;

        for (int mask = 1; mask <= full; mask++) {
            for (int i = 0; i < n; i++) {
                if ((mask & (1 << i)) == 0 || dp[mask][i] == Integer.MAX_VALUE) continue;
                for (int j = 0; j < n; j++) {
                    if ((mask & (1 << j)) != 0) continue;
                    dp[mask | (1 << j)][j] = Math.min(
                        dp[mask | (1 << j)][j], dp[mask][i] + dist[i][j]);
                }
            }
        }

        int ans = Integer.MAX_VALUE;
        for (int i = 1; i < n; i++) {
            if (dp[full][i] != Integer.MAX_VALUE)
                ans = Math.min(ans, dp[full][i] + dist[i][0]);
        }
        return ans;
    }
}`,
    python: `def tsp(dist):
    n = len(dist)
    full = (1 << n) - 1
    dp = [[float("inf")] * n for _ in range(1 << n)]
    dp[1][0] = 0

    for mask in range(1, full + 1):
        for i in range(n):
            if not (mask & (1 << i)) or dp[mask][i] == float("inf"):
                continue
            for j in range(n):
                if mask & (1 << j):
                    continue
                dp[mask | (1 << j)][j] = min(
                    dp[mask | (1 << j)][j], dp[mask][i] + dist[i][j])

    ans = float("inf")
    for i in range(1, n):
        if dp[full][i] != float("inf"):
            ans = min(ans, dp[full][i] + dist[i][0])
    return ans`,
    javascript: `function tsp(dist) {
  const n = dist.length;
  const full = (1 << n) - 1;
  const dp = Array.from({ length: 1 << n }, () => new Array(n).fill(Infinity));
  dp[1][0] = 0;

  for (let mask = 1; mask <= full; mask++) {
    for (let i = 0; i < n; i++) {
      if (!(mask & (1 << i)) || dp[mask][i] === Infinity) continue;
      for (let j = 0; j < n; j++) {
        if (mask & (1 << j)) continue;
        dp[mask | (1 << j)][j] = Math.min(
          dp[mask | (1 << j)][j],
          dp[mask][i] + dist[i][j]
        );
      }
    }
  }

  let ans = Infinity;
  for (let i = 1; i < n; i++) {
    if (dp[full][i] !== Infinity) ans = Math.min(ans, dp[full][i] + dist[i][0]);
  }
  return ans;
}`
  }
};
