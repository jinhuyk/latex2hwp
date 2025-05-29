import { matrixVariants } from "../map/alignMap";

export const alignMap: Record<string, (content: any[], stringifyMath: (node: any) => string) => string> = {
  cases: (content, stringifyMath) =>
    `cases{${content.map(x =>
      x.kind === 'alignmentTab' ? '&' :
      x.kind === 'linebreak' ? '#' :
      stringifyMath(x)
    ).join(' ')}}`,
};

for (const name of matrixVariants) {
  alignMap[name] = (content, stringifyMath) =>
    `matrix{${content.map(x => x.kind === 'alignmentTab' ? '#' : stringifyMath(x)).join(' ')}}`;
}

export function convertToCasesIfApplicable(node: any, stringifyMath: (n: any) => string): string | null {
  if (
    node.kind === 'math.matching_delimiters' &&
    ['\\left\\{', '\\{'].includes(node.left) &&
    ['\\right.', '.'].includes(node.right) &&
    node.content.length === 1 &&
    node.content[0].kind === 'env'
  ) {
    const fakeCaseNode = {
      kind: 'env.math.aligned',
      name: 'cases',
      content: node.content[0].content
    };
    return stringifyMath(fakeCaseNode);
  }
  return null;
}
