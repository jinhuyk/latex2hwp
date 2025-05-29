import { accentMap } from "../map/accentMap";
import { passthroughList } from "../map/passthroughList";
import { spacingMap } from "../map/spacingMap";
import { styleList } from "../map/styleMap";
import { symbolMap } from "../map/symbolMap";

export function cvtFrac(node: any, convertFn: (node: any) => string): string {
  if (node.args.length === 2) {
    const numerator = convertFn(node.args[0]);
    const denominator = convertFn(node.args[1]);
    return `${numerator}over${denominator}`;
  }
  // 인자가 2개가 아니면 원본 명령어 그대로 반환
  return `${node.name}`;
}
export function cvtNthRoot(node: any, convertFn: (node: any) => string): string {
  // 일반적으로 \sqrt는 args가 1개 (내용) 또는 2개 (차수, 내용)
  if (node.args.length === 2) {
    const degree = convertFn(node.args[0]);
    const value = convertFn(node.args[1]);
    return `root{${degree}}of${value}`;
  } else if (node.args.length === 1) {
    // 차수가 없는 경우 일반 sqrt 처리
    const value = convertFn(node.args[0]);
    return `sqrt${value}`;
  }
  return `${node.name}`;
}
export function cvtRm(node: any, convertFn: (node: any) => string): string {
  if (node.args.length === 1) {
    const arg = convertFn(node.args[0]);
    return `rm{${arg}}it `;
  }
  return `${node.name}`;
}
export function cvtText(node: any, convertFn: (node: any) => string): string {
  if (node.args.length === 1) {
    const arg = convertFn(node.args[0]);
    return `${arg}`;
  }
  return `${node.name}`;
}


export const accentCommands = Object.keys(accentMap);
export function cvtAccent(node: any, convertFn: (node: any) => string): string {
  const target = accentMap[node.name];
  if (target && node.args.length === 1) {
    return `${target}{${convertFn(node.args[0])}}`;
  }
  return `${node.name}`;
}


export const symbolCommands = Object.keys(symbolMap);
export function cvtSymbol(node: any): string {
  return symbolMap[node.name] || `${node.name}`;
}


export const spacingCommands = Object.keys(spacingMap);
export function cvtSpacing(node: any): string {
  return spacingMap[node.name] || `${node.name}`;
}

export const styleCommands = styleList;

export const passthroughCommands = passthroughList;
export function cvtPassthrough(node: any, convertFn: (node: any) => string): string {
  const name = node.name;
  const argsStr = node.args?.map(convertFn).join('') ?? '';
  return `${name}${argsStr}`;
}