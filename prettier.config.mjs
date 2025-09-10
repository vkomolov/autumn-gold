export default {
  semi: true, // add semicolons at the end of statements
  singleQuote: false, // use double quotes instead of single quotes
  trailingComma: "all", // trailing commas wherever allowed (ES5+)
  tabWidth: 2, // override indentation width when useTabs is false
  printWidth: 90, // wrap lines longer than N characters
  arrowParens: "avoid", // omit parens when possible: x => x

  /* ===== optional rules below – uncomment if needed ===== */

  // useTabs: true,                    // indent lines with tabs (\t) instead of spaces
  // quoteProps: 'as-needed',          // quote object props only when necessary
  // jsxSingleQuote: true,             // use single quotes in JSX
  bracketSpacing: true, // spaces in object literals: { foo: bar }
  // bracketSameLine: false,           // put > of multi-line HTML/JSX on new line
  // jsxBracketSameLine: false,        // deprecated alias for bracketSameLine
  // proseWrap: 'preserve',            // how to wrap markdown text: always / never / preserve
  // htmlWhitespaceSensitivity: 'css', // how to treat whitespace in HTML: css / strict / ignore
  // vueIndentScriptAndStyle: false,   // indent <script> & <style> tags in Vue SFC
  endOfLine: "lf", // lf / crlf / auto (auto = preserve existing)
  // embeddedLanguageFormatting: 'auto', // format embedded code blocks: auto / off
  // insertPragma: false,              // insert @prettier at top of formatted files
  // requirePragma: false,             // format only files with @prettier pragma
  // filepath: '',                     // override detected file path (API usage)
  // parser: '',                       // force parser: babel / typescript / espree / etc
};
