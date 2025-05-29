
import { ignoredCommands } from "../map/ignoredList";
import { accentCommands, cvtAccent, cvtFrac,  cvtNthRoot,   cvtPassthrough,   cvtRm, cvtSpacing, cvtSymbol, cvtText, passthroughCommands, spacingCommands, styleCommands, symbolCommands,  } from "./commands";


const commandMap: Record<string, (node: any, convertFn: (node: any) => string) => string> = {
  frac: cvtFrac,
  sqrt: cvtNthRoot,
  mathrm: cvtRm,
  text: cvtText,
};
symbolCommands.forEach(cmd => {
  commandMap[cmd] = cvtSymbol;
});

accentCommands.forEach(cmd =>{
  commandMap[cmd] = cvtAccent;
});
spacingCommands.forEach(cmd =>{
  commandMap[cmd] = cvtSpacing;
});
styleCommands.forEach(cmd => {
  commandMap[cmd] = (node, convertFn) =>
    node.args ? node.args.map(convertFn).join('') : '';
});
passthroughCommands.forEach(cmd => {
  if (!(cmd in commandMap)) {
    commandMap[cmd] = cvtPassthrough;
  }
});


//Todo : 기호 처리 및 다른 연산 들 처리하기
export function convertCommand(node: any, convertFn: (node: any) => string): string {
  if (ignoredCommands.has(node.name)) {
    return '';
  }
  if (node.name in commandMap) {
    return commandMap[node.name](node, convertFn);
  }
  const argsStr = node.args ? node.args.map(convertFn).join(' ') : '';
  return `{${node.name}${argsStr}}`;
}