

import { convertCommand } from "./command/dispatcher";
import { alignMap, convertToCasesIfApplicable } from "./align/aligns";
import { delimiterMap } from "./map/delimiterMap";

export function stringifyMath(node: any): string {
    switch (node.kind) {
        case 'text.string':
            return node.content+'~';
        case 'math.character':
            return node.content;

        case 'command':
            return ' ' + convertCommand(node, stringifyMath) + ' ';

        case 'arg.group':
            return '{' + node.content.map(stringifyMath).join(' ') + '}';
        case 'math.math_delimiters':
            return ' left' + node.left + node.content.map(stringifyMath).join(' ') + ' right' + node.right;
        
        case 'math.matching_delimiters':
            const converted = convertToCasesIfApplicable(node, stringifyMath);
            if (converted !== null) return converted;
            
            const normalizeDelim = (delim: string | undefined) =>
                delim && delimiterMap[delim] ? delimiterMap[delim] : delim;
            const leftDelim = normalizeDelim(node.left);
            const rightDelim = normalizeDelim(node.right);
            return ' left' + leftDelim + node.content.map(stringifyMath).join(' ') + ' right' + rightDelim;

        case 'superscript':
            return '^{' + stringifyMath(node.arg) + '}';
        case 'subscript':
            return '_{' + stringifyMath(node.arg) + '}';


        
        case 'env.math.aligned':
            if (alignMap[node.name]) {
                return alignMap[node.name](node.content, stringifyMath);
            }
            return `${node.content.map(stringifyMath).join(' ')}`;
        
        case 'env':
            return `${node.content.map(stringifyMath).join(' ')}`;
        case 'alignmentTab':
            return '&';
        case 'linebreak':
        case 'parbreak':
            return '#';
        case 'command.text':
            return '~'+stringifyMath(node.arg)+'~';
        default:
            if (node.content && Array.isArray(node.content)) {
                return node.content.map(stringifyMath).join(' ');
            }
            return '';
    }
}
        