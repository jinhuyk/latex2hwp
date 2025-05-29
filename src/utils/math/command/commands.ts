



export function cvtFrac(node: any, convertFn: (node: any) => string): string {
  if (node.args.length === 2) {
    const numerator = convertFn(node.args[0]);
    const denominator = convertFn(node.args[1]);
    return `${numerator}over${denominator}`;
  }
  // 인자가 2개가 아니면 원본 명령어 그대로 반환
  return `\\${node.name}`;
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
  return `\\${node.name}`;
}
export function cvtSum(node: any, convertFn: (node: any) => string): string {
  const sub = node.sub ? convertFn(node.sub) : '';
  const sup = node.sup ? convertFn(node.sup) : '';
  const base = `sum`;
  if (sub && sup) return `${base}_${sub}^${sup}`;
  if (sub) return `${base}_${sub}`;
  if (sup) return `${base}^${sup}`;
  return base;
}

export function cvtInt(node: any, convertFn: (node: any) => string): string {
  const sub = node.sub ? convertFn(node.sub) : '';
  const sup = node.sup ? convertFn(node.sup) : '';
  const base = `int`;
  if (sub && sup) return `${base}_${sub}^${sup}`;
  if (sub) return `${base}_${sub}`;
  if (sup) return `${base}^${sup}`;
  return base;
}
export function cvtLim(node: any, convertFn: (node: any) => string): string {
  const sub = node.sub ? convertFn(node.sub) : '';
  const sup = node.sup ? convertFn(node.sup) : '';
  const base = `lim`;
  if (sub && sup) return `${base}_${sub}^${sup}`;
  if (sub) return `${base}_${sub}`;
  if (sup) return `${base}^${sup}`;
  return base;
}

export function cvtVec(node: any, convertFn: (node: any) => string): string {
  if (node.args.length === 1) {
    const arg = convertFn(node.args[0]);
    return `vec{${arg}}`;
  }
  return `\\${node.name}`;
}
export function cvtBar(node: any, convertFn: (node: any) => string): string {
  if (node.args.length === 1) {
    const arg = convertFn(node.args[0]);
    return `bar{${arg}}`;
  }
  return `\\${node.name}`;
}
export function cvtHat(node: any, convertFn: (node: any) => string): string {
  if (node.args.length === 1) {
    const arg = convertFn(node.args[0]);
    return `hat{${arg}}`;
  }
  return `\\${node.name}`;
}
export function cvtTilde(node: any, convertFn: (node: any) => string): string {
  if (node.args.length === 1) {
    const arg = convertFn(node.args[0]);
    return `tilde{${arg}}`;
  }
  return `\\${node.name}`;
}
export function cvtRm(node: any, convertFn: (node: any) => string): string {
  if (node.args.length === 1) {
    const arg = convertFn(node.args[0]);
    return `rm{${arg}}it `;
  }
  return `\\${node.name}`;
}

export function cvtBf(node: any, convertFn: (node: any) => string): string {
  if (node.args.length === 1) {
    const arg = convertFn(node.args[0]);
    return `bf{${arg}}it `;
  }
  return `\\${node.name}`;
}

export function cvtIt(node: any, convertFn: (node: any) => string): string {
  if (node.args.length === 1) {
    const arg = convertFn(node.args[0]);
    return `it{${arg}}`;
  }
  return `\\${node.name}`;
}

export function cvtSf(node: any, convertFn: (node: any) => string): string {
  if (node.args.length === 1) {
    const arg = convertFn(node.args[0]);
    return `sf{${arg}}it`;
  }
  return `\\${node.name}`;
}

export const passthroughCommands = [
  "sin", "cos", "tan", "cot", "sec", "csc",
  "arcsin", "arccos", "arctan",
  "log", "ln", "max", "min", "exp", "det", "mod",
  "sinh", "cosh", "tanh", "coth", "gcd"
];

export function cvtPassthrough(node: any, convertFn: (node: any) => string): string {
  const name = node.name;
  const argsStr = node.args?.map(convertFn).join('') ?? '';
  return `${name}${argsStr}`;
}