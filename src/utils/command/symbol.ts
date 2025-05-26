const symbolMap: Record<string, string> = {
    //대체어적기 mapping
  perp: 'perp',
  top: 'top',
  bot: 'bot',
  emptyset: 'emptyset',
  infty: 'infty',
  cup: 'cup',
  cap: 'cap',
  // 필요한 기호들을 계속 추가
};
export const symbolCommands = [
  'perp',
  'top',
  'bot',
  'emptyset',
  'infty',
  'cup',
  'cap',
  // 필요한 기호 추가 가능
];

export function cvtSymbol(node: any): string {
  return symbolMap[node.name] || `\\${node.name}`;
}