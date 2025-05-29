import { cvtBar, cvtBf, cvtFrac, cvtHat, cvtInt,  cvtIt,  cvtLim, cvtNthRoot, cvtPassthrough, cvtRm, cvtSf, cvtSum, cvtTilde, cvtVec, passthroughCommands } from "./commands";
import { cvtSymbol, symbolCommands } from "./symbol";

const commandMap: Record<string, (node: any, convertFn: (node: any) => string) => string> = {
  frac: cvtFrac,
  root: cvtNthRoot,
  sum: cvtSum,
  int: cvtInt,
  lim: cvtLim,

  // vector, bar
  vec: cvtVec,
  overrightarrow: cvtVec, // 보통 \vec 대신 \overrightarrow 사용하기도 함
  bar: cvtBar,
  overline: cvtBar, 
  hat: cvtHat,
  tilde: cvtTilde,

  // 문장꾸밈
  mathrm: cvtRm,
  mathbf: cvtBf,
  mathit: cvtIt,
  mathsf: cvtSf,

  // 추후 다른 명령어 추가 가능
};
symbolCommands.forEach(cmd => {
  commandMap[cmd] = cvtSymbol;
});
//passthrough
passthroughCommands.forEach(cmd => {
  if (!(cmd in commandMap)) {
    commandMap[cmd] = cvtPassthrough;
  }
});



//Todo : 기호 처리 및 다른 연산 들 처리하기
export function convertCommand(node: any, convertFn: (node: any) => string): string {
  if (node.name in commandMap) {
    return commandMap[node.name](node, convertFn);
  }
  // 처리할 명령어가 없으면 원본 명령어 + 인자 문자열 반환
  const argsStr = node.args ? node.args.map(convertFn).join(' ') : ' ';
  return `\\${node.name}${argsStr}`;
}