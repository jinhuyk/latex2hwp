function cvt_escaped_brackets(text: string): string {
    return text
        .replace(/\\\{/g, '{')
        .replace(/\\\}/g, '}')
        .replace(/\\\[/g, '[')
        .replace(/\\\]/g, ']')
        .replace(/\\\(/g, '(')
        .replace(/\\\)/g, ')')
        .replace(/\\\|/g, '|');
}
function cvt_frac(text: string): string {
    return text.replace(/\\frac\{(.*?)\}\{(.*?)\}/g, (_, a, b) => `{${a}}over{${b}}`);
}

function cvt_superscript(text: string): string {
    // Handles ^{...} or ^word or ^char, with optional spacing after
    return text.replace(/\^(\{[^}]*\}|\w)/g, (_, val) => `^${val} `);
}

function cvt_subscript(text: string): string {
    // Handles _{...} or _word or _char, with optional spacing after
    return text.replace(/_(\{[^}]*\}|\w)/g, (_, val) => `_${val} `);
}

function cvt_sqrt(text: string): string {
    return text.replace(/\\sqrt\{(.*?)\}/g, (_, inner) => `sqrt{${inner}}`);
}

function cvt_nth_root(text: string): string {
    return text.replace(/\\sqrt\[(.*?)\]\{(.*?)\}/g, (_, n, v) => `root{${n}}of{${v}}`);
}

function cvt_integral(text: string): string {
    return text.replace(/\\int(?:_({.*?}|\w+))?(?:\^({.*?}|\w+))?/g, (_, a, b) => {
        if (a && b) return `int_${a}^${b}`;
        if (a) return `int_${a}`;
        if (b) return `int^${b}`;
        return `int`;
    });
}

function cvt_sum(text: string): string {
    return text.replace(/\\sum(?:_({.*?}|\w+))?(?:\^({.*?}|\w+))?/g, (_, a, b) => {
        if (a && b) return `sum_${a}^${b}`;
        if (a) return `sum_${a}`;
        if (b) return `sum^${b}`;
        return `sum`;
    });
}

function cvt_lim(text: string): string {
    return text.replace(/\\lim(?:_({.*?}|\w+))?/g, (_, cond) => cond ? `lim_${cond}` : `lim`);
}

function cvt_vec(text: string): string {
    return text.replace(/\\vec\{(.*?)\}/g, (_, val) => `vec{${val}}`);
}

function cvt_overline(text: string): string {
    return text.replace(/\\overline\{(.*?)\}/g, (_, val) => `bar{${val}}`);
}

function cvt_text(text: string): string {
    return text.replace(/\\text\s?\{(.*?)\}/g, (_, val) => ` @mh@ ${val}@mh@#`);
}

function cvt_left_right(text: string): string {
    return text.replace(/\\left([\(\[\\{\|])([\s\S]*?)\\right([\)\]\\}\|])/g, (_, l, body, r) => ` left${l}${body} right${r}`);
}

function cvt_cases(text: string): string {
    return text.replace(
        /\\begin\{(?:cases|array)\*?\}[\s\S]*?\}?\s*([\s\S]*?)\\end\{(?:cases|array)\*?\}/g,
        (_, val) => {
            const lines = val.trim().split(/\\\\/).map((row: string) => row.trim());
            const cleaned = lines
                .map((row: string) =>
                    row.split(/\s*&\s*/).map((p: string) => p.trim()).join(' & ')
                )
                .join(' # ');
            return `cases{${cleaned}}`;
        }
    );
}

function cvt_matrix(text: string): string {
    return text.replace(/\\begin\{(?:b|p)?matrix\}([\s\S]*?)\\end\{(?:b|p)?matrix\}/g, (_, content) => {
        const rows = content.trim().split(/\\\\/).map((row: string) => row.trim());
        const formatted = rows.map((row: string) => row.split(/\s*&\s*/).map((p: string) => p.trim()).join(' & ')).join(' # ');
        return `matrix{${formatted}}`;
    });
}

function cvt_align(text: string): string {
    return text.replace(/\\begin\{(?:align|align\*|aligned|eqnarray|multline|gather|gathered|equation)\}([\s\S]*?)\\end\{(?:align|align\*|aligned|eqnarray|multline|gather|gathered)\}/g, (_, body) => {
        const lines = body.trim().split(/\\\\/).map((line: string) => line.trim());
        return lines.join(' # ');
    });
}

function cvt_logic_symbols(text: string): string {
    return text
        .replace(/\\Rightarrow/g, '=>')
        .replace(/\\Leftarrow/g, '<=')
        .replace(/\\Leftrightarrow/g, '<=>')
        .replace(/\\rightarrow/g, '->')
        .replace(/\\leftarrow/g, '<-')
        .replace(/\\forall/g, 'forall')
        .replace(/\\exists/g, 'exists')
        .replace(/\\neg/g, 'neg')
        .replace(/\\land/g, 'and')
        .replace(/\\lor/g, 'or')
        .replace(/\\times/g, 'times');
}

function cvt_relation_symbols(text: string): string {
    return text
        .replace(/\\leq/g, '<=')
        .replace(/\\geq/g, '>=')
        .replace(/\\neq/g, '!=')
        .replace(/\\infty/g, 'infty')
        .replace(/\\in/g, 'in')
        .replace(/\\notin/g, 'notin')
}

function cvt_advanced_operators(text: string): string {
    return text
        .replace(/\\triangledown/g, '▽')
        .replace(/\\triangle/g, '△')
        .replace(/\\subseteq/g, '⊆')
        .replace(/\\supseteq/g, '⊇')
        .replace(/\\subset/g, '⊂')
        .replace(/\\supset/g, '⊃')
        .replace(/\\in/g, '∈')
        .replace(/\\notin/g, '∉')
        .replace(/\\exists/g, '∃')
        .replace(/\\forall/g, '∀')
        .replace(/\\emptyset/g, '∅')
        .replace(/\\therefore/g, '∴')
        .replace(/\\because/g, '∵')
        .replace(/\\approx/g, '≈')
        .replace(/\\equiv/g, '≡')
        .replace(/\\simeq/g, '≃')
        .replace(/\\sim/g, '∼')
        .replace(/\\cong/g, '≅')
        .replace(/\\asymp/g, '≍')
        .replace(/\\propto/g, '∝')
        .replace(/\\partial/g, '∂')
        .replace(/\\dagger/g, '†')
        .replace(/\\ddagger/g, '‡')
        .replace(/\\nabla/g, '∇')
        .replace(/\\infty/g, '∞')
        .replace(/\\pm/g, '±')
        .replace(/\\mp/g, '∓')
        .replace(/\\div/g, '÷')
        .replace(/\\circ/g, '∘')
        .replace(/\\ast/g, '∗')
        .replace(/\\star/g, '⋆')
        .replace(/\\prime/g, 'prime')
}

function cvt_set_symbols(text: string): string {
    return text
        .replace(/\\emptyset/g, 'emptyset')
        .replace(/\\cup/g, '∪')
        .replace(/\\cap/g, '∩')
        .replace(/\\subset/g, '⊂')
        .replace(/\\supset/g, '⊃');
}
function cvt_misc_symbols(text: string): string {
    return text
        .replace(/\\therefore/g, '∴')
        .replace(/\\because/g, '∵')
        .replace(/\\dots/g, 'dots')
        .replace(/\\ldots/g, 'ldots')
        .replace(/\\vdots/g, 'vdots')
        .replace(/\\ddots/g, 'ddots')
        .replace(/\\cdots/g, 'cdots')
        .replace(/\\cdot/g, 'cdot')
        .replace(/\\angle/g, '∠')
        .replace(/\\measuredangle/g, '∡')
        .replace(/\\sphericalangle/g, '∢')
        .replace(/\\triangle/g, '△')
        .replace(/\\triangledown/g, '▽')
        .replace(/\\nabla/g, '∇')
        .replace(/\\models/g, '⊨')
        .replace(/\\perp/g, '⊥')
        .replace(/\\top/g, '⊤')
        .replace(/\\bot/g, '⊥')
        .replace(/\\vert/g, '|')
        .replace(/\\/g, '\\');
}

function cvt_text_style(text: string): string {
    return text
        .replace(/\\mathrm\{(.*?)\}/g, 'rm{$1}')
        .replace(/\\mathbf\{(.*?)\}/g, 'bf{$1}')
        .replace(/\\mathit\{(.*?)\}/g, 'it{$1}')
        .replace(/\\mathsf\{(.*?)\}/g, 'sf{$1}');
}
function cvt_function_names(text: string): string {
    return text
        .replace(/\\arcsin/g, 'arcsin`')
        .replace(/\\arccos/g, 'arccos`')
        .replace(/\\arctan/g, 'arctan`')
        // cosec과 동일
        .replace(/\\cosec/g, 'cosec`')
        .replace(/\\sinh/g, 'sinh`')
        .replace(/\\cosh/g, 'cosh`')
        .replace(/\\tanh/g, 'tanh`')
        .replace(/\\coth/g, 'coth`')
        .replace(/\\arc/g, 'arc`')
        .replace(/\\sin/g, 'sin`')
        .replace(/\\cos/g, 'cos`')
        .replace(/\\tan/g, 'tan`')
        .replace(/\\cot/g, 'cot`')
        .replace(/\\sec/g, 'sec`')
        .replace(/\\csc/g, 'csc`')
        .replace(/\\log/g, 'log`')
        .replace(/\\ln/g, 'ln`')
        .replace(/\\lg/g, 'lg`')
        .replace(/\\max/g, 'max`')
        .replace(/\\min/g, 'min`')
        .replace(/\\lim/g, 'lim`')
        .replace(/\\Lim/g, 'Lim`')
        .replace(/\\exp/g, 'exp`')
        .replace(/\\Exp/g, 'Exp`')
        .replace(/\\det/g, 'det`')
        .replace(/\\mod/g, 'mod`')
        .replace(/\\gcd/g, 'gcd`');
}

function cvt_greek_letters(text: string): string {
    return text
        .replace(/\\Alpha/g, 'Alpha')
        .replace(/\\Beta/g, 'Beta')
        .replace(/\\Gamma/g, 'Gamma')
        .replace(/\\Delta/g, 'Delta')
        .replace(/\\Epsilon/g, 'Epsilon')
        .replace(/\\Zeta/g, 'Zeta')
        .replace(/\\Eta/g, 'Eta')
        .replace(/\\Theta/g, 'Theta')
        .replace(/\\Iota/g, 'Iota')
        .replace(/\\Kappa/g, 'Kappa')
        .replace(/\\Lambda/g, 'Lambda')
        .replace(/\\Mu/g, 'Mu')
        .replace(/\\Nu/g, 'Nu')
        .replace(/\\Xi/g, 'Xi')
        .replace(/\\Omicron/g, 'Omicron')
        .replace(/\\Pi/g, 'Pi')
        .replace(/\\Rho/g, 'Rho')
        .replace(/\\Sigma/g, 'Sigma')
        .replace(/\\Tau/g, 'Tau')
        .replace(/\\Upsilon/g, 'Upsilon')
        .replace(/\\Phi/g, 'Phi')
        .replace(/\\Chi/g, 'Chi')
        .replace(/\\Psi/g, 'Psi')
        .replace(/\\Omega/g, 'Omega')
        .replace(/\\alpha/g, 'alpha')
        .replace(/\\beta/g, 'beta')
        .replace(/\\gamma/g, 'gamma')
        .replace(/\\delta/g, 'delta')
        .replace(/\\epsilon/g, 'epsilon')
        .replace(/\\zeta/g, 'zeta')
        .replace(/\\eta/g, 'eta')
        .replace(/\\theta/g, 'theta')
        .replace(/\\iota/g, 'iota')
        .replace(/\\kappa/g, 'kappa')
        .replace(/\\lambda/g, 'lambda')
        .replace(/\\mu/g, 'mu')
        .replace(/\\nu/g, 'nu')
        .replace(/\\xi/g, 'xi')
        .replace(/\\omicron/g, 'omicron')
        .replace(/\\pi/g, 'pi')
        .replace(/\\rho/g, 'rho')
        .replace(/\\sigma/g, 'sigma')
        .replace(/\\tau/g, 'tau')
        .replace(/\\upsilon/g, 'upsilon')
        .replace(/\\phi/g, 'phi')
        .replace(/\\chi/g, 'chi')
        .replace(/\\psi/g, 'psi')
        .replace(/\\omega/g, 'omega')
        .replace(/\ell/g, 'ell');

}

function cvt_spacing(text: string): string {
    return text
        .replace(/\\,/g, '`')
        .replace(/\\quad/g, '~')
        .replace(/\\\\/g, ' # ')
        .replace(/\s+/g, ' ')
        .trim();
}
function applyRepeatedly(text: string, fn: (x: string) => string, maxIter = 10): string {
    let prev = '', curr = text, count = 0;
    while (curr !== prev && count++ < maxIter) {
        prev = curr;
        curr = fn(curr);
    }
    return curr;
}
function removeLatexTags(text: string): string {
    return text.replace(/\\tag\{.*?\}/g, '');
}

function convertLatexToHwp(text: string): string {
    let result = text;

    // 반복적으로 처리할 항목들
    result = applyRepeatedly(result, cvt_left_right);
    result = applyRepeatedly(result, cvt_frac);
    result = applyRepeatedly(result, cvt_sqrt);
    result = applyRepeatedly(result, cvt_nth_root);
    result = applyRepeatedly(result, cvt_overline);

    // 그 외 일반 변환
    result = cvt_superscript(result);
    result = cvt_subscript(result);
    result = cvt_integral(result);
    result = cvt_sum(result);
    result = cvt_lim(result);
    result = cvt_vec(result);
    result = cvt_text(result);
    result = cvt_cases(result);
    result = cvt_matrix(result);
    result = cvt_align(result);
    result = cvt_logic_symbols(result);
    result = cvt_relation_symbols(result);
    result = cvt_advanced_operators(result);
    result = cvt_set_symbols(result);
    result = cvt_misc_symbols(result);
    result = cvt_text_style(result);
    result = cvt_function_names(result);
    result = cvt_greek_letters(result);
    result = cvt_spacing(result);
    result = removeLatexTags(result);
    result = cvt_escaped_brackets(result);
    result = result.replace(/\\/g, '');
    // Remove cvt_capital_letters_to_rm(result); from here
    return result;
}

function extract_math_blocks(text: string): string {
    return text
        .replace(/\\begin\{(align|eqnarray|gather|multline|equation)\*?\}([\s\S]*?)\\end\{\1\*?\}/g,
            (_, env, body) => `@mh@${convertLatexToHwp(body.trim())}@mh@`)
        .replace(/\$\$([\s\S]*?)\$\$/g, (_, body) => `@mh@${convertLatexToHwp(body.trim())}@mh@`)
        .replace(/\\\[((.|\n)*?)\\\]/g, (_, body) => `@mh@${convertLatexToHwp(body.trim())}@mh@`)
        .replace(/\$([^\$\n]+)\$/g, (_, body) => `@mh@${convertLatexToHwp(body.trim())}@mh@`);
}
function extract_table_blocks(text: string): string {

    return text.replace(/\\begin\{tabular\}\{[^}]*\}([\s\S]*?)\\end\{tabular\}/g, (_, body) =>
        `${body.trim()}`)
        .replace(/\\hline/g, '');

}
function extract_image_blocks(text: string): string {
    return text.replace(/!\[\]\((https?:\/\/[^\)\s]+)\)/g, (_, url) => `@img@${url}@img@`);
}
function normalizeMhTags(text: string): string {
    return text.replace(/(@mh@)+/g, '@mh@');
}

function convertMath(text: string):string{
    text = extract_math_blocks(text);
    text = normalizeMhTags(text);
    // Remove # after @mh@ with optional whitespace
    text = text.replace(/@mh@\s*#\s*/g, '@mh@');
    return text;
}
function cvt_capital_letters_to_rm(text: string): string {
    return text.replace(/\b([A-Z]+)\b/g, '@rm@$1@rm@');
}
export function convertFullLatex(text: string): string {
    // First, extract math blocks and convert them
    text = convertMath(text);
    text = extract_image_blocks(text);
    text = text.replace(/@mh@\s*#\s*/g, '@mh@');
    // Now, wrap capital letters with @rm@, but only outside of math blocks
    let parts: string[] = [];
    let regex = /@mh@.*?@mh@/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
        // Push text before math block
        const before = text.slice(lastIndex, match.index);
        parts.push(cvt_capital_letters_to_rm(before));

        // Push math block as-is
        parts.push(match[0]);

        lastIndex = regex.lastIndex;
    }

    // Push remaining text
    const after = text.slice(lastIndex);
    parts.push(cvt_capital_letters_to_rm(after));

    return parts.join('');
}

