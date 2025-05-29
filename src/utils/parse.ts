// test.ts
import { latexParser } from 'latex-utensils';
import { AstRoot} from "latex-utensils/out/types/src/latex/latex_parser_types";
import { stringifyMath } from './math/math';



function parseLatexToAst(latex: string): AstRoot | string {
    return latexParser.parse(latex, { startRule: "Root" }) as AstRoot;
}

export function stringify(latex: string): string {

  const AST = parseLatexToAst(latex);
  return stringifyMixed(AST);
}
export function stringifyMixed(node: any): string{
  let result = '';
  if (node.kind === 'text.string' || node.kind === 'math.character') {
    result += `${node.content}`;
  } 
  else if(node.kind === 'inlineMath') {
    result += ""+ node.content.map(stringifyMath).join('')+"";
  }
  else if(node.kind ==='displayMath' || node.kind ==='env.math.align') {
    result += "\n"+ node.content.map(stringifyMath).join('')+"\n";
  }

  else if(node.content && Array.isArray(node.content)) {
    for (const child of node.content) {
      result += stringifyMixed(child)+' ';
    }
  }
  else {
    result += '';
  } 

  return result;
}


//TEST Node
function printNode(node: any, indent = 0): string {
  const pad = '  '.repeat(indent);
  let result = `${pad}${node.kind || 'unknown'}`;

  if (node.kind === 'text.string' || node.kind === 'math.character') {
    result += `: "${node.content}"`;
  } else if (node.kind === 'command') {
    result += `: \\${node.name}`;
  } else if (node.kind === 'environment') {
    result += `: ${node.name}`;
  }

  result += '\n';

  if (node.content && Array.isArray(node.content)) {
    for (const child of node.content) {
      result += printNode(child, indent + 1);
    }
  }

  // superscript/subscript 등 자식이 별도로 있으면 추가 출력
  if (node.base) {
    result += `${pad}  base:\n` + printNode(node.base, indent + 2);
  }
  if (node.arg) {
    result += `${pad}  arg:\n` + printNode(node.arg, indent + 2);
  }

  return result;
}
