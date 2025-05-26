import { cvtFrac, cvtInt,  cvtLim, cvtNthRoot, cvtSum } from "./commands";

const commandMap: Record<string, (node: any, convertFn: (node: any) => string) => string> = {
  frac: cvtFrac,
  root: cvtNthRoot,
  sum: cvtSum,
  int: cvtInt,
  lim: cvtLim,
  // 추후 다른 명령어 추가 가능
};
export function convertCommand(node: any, convertFn: (node: any) => string): string {
  if (node.name in commandMap) {
    return commandMap[node.name](node, convertFn);
  }
  // 처리할 명령어가 없으면 원본 명령어 + 인자 문자열 반환
  const argsStr = node.args ? node.args.map(convertFn).join('') : '';
  return `\\${node.name}${argsStr}`;
}