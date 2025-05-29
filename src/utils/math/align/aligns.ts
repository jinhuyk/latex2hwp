export const alignMap: Record<string, (content: any[], stringifyMath: (node: any) => string) => string> = {
  cases: (content, stringifyMath) =>
    `cases{${content.map(stringifyMath).join(' ')}}`,
  matrix: (content, stringifyMath) =>
    `matrix{${content.map(stringifyMath).join(' ')}}`,
};