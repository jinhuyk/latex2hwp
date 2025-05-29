
import { convertCommand } from "./command/dispatcher";
import { alignMap } from "./align/aligns";

export function stringifyMath(node: any): string {
    switch (node.kind) {
        case 'text.string':
        case 'math.character':
            return node.content;

        case 'command':
            return ' ' + convertCommand(node, stringifyMath) + ' ';

        case 'arg.group':
            return '{' + node.content.map(stringifyMath).join(' ') + '}';
        case 'math.math_delimiters':
            return ' left' + node.left + node.content.map(stringifyMath).join(' ') + ' right' + node.right;
        case 'math.matching_delimiters':
            const leftDelim = node.left === '\\{' ? '{' : node.left;
            const rightDelim = node.right === '\\}' ? '}' : node.right;

            return ' left' + leftDelim + node.content.map(stringifyMath).join(' ') + ' right' + rightDelim;
        case 'superscript':
            return '^{' + stringifyMath(node.arg) + '}';

        case 'subscript':
            return '_{' + stringifyMath(node.arg) + '}';
        case 'env.math.aligned':
            if (alignMap[node.name]) {
                return alignMap[node.name](node.content, stringifyMath);
            }
            return `\\begin{${node.name}}${node.content.map(stringifyMath).join('')}\\end{${node.name}}`;
        case 'env':
            return `\\begin{${node.name}}${node.content.map(stringifyMath).join('')}\\end{${node.name}}`;
        case 'alignmentTab':
            return ' & ';
        case 'linebreak':
        case 'parbreak':
            return ' # ';

        default:
            if (node.content && Array.isArray(node.content)) {
                return node.content.map(stringifyMath).join(' ');
            }
            return '';
    }
}