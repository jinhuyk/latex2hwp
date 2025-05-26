
import { convertCommand } from "./command/dispatcher";

export function stringifyMath(node: any): string {
    switch (node.kind) {
        case 'text.string':
        case 'math.character':
            return node.content;

        case 'command':
            return convertCommand(node, stringifyMath);

        case 'arg.group':
            return '{' + node.content.map(stringifyMath).join('') + '}';

        case 'math.matching_delimiters':
        case 'math.matching_delimiters':
            // 만약 node.left가 '\{' 이면 '{'로 변환
            const leftDelim = node.left === '\\{' ? '{' : node.left;
            const rightDelim = node.right === '\\}' ? '}' : node.right;

            return ' left' + leftDelim + node.content.map(stringifyMath).join('') + ' right' + rightDelim;
        case 'superscript':
            return '^{' + stringifyMath(node.arg) + '}';

        case 'subscript':
            return '_{' + stringifyMath(node.arg) + '}';

        case 'environment':
            return `\\begin{${node.name}}${node.content.map(stringifyMath).join('')}\\end{${node.name}}`;

        case 'parbreak':
            return ' # ';

        default:
            if (node.content && Array.isArray(node.content)) {
                return node.content.map(stringifyMath).join('');
            }
            return '';
    }
}