import * as CodeMirror from 'codemirror';

const noteKeywords = ['workflow', 'externalSystem', 'service', 'command', 'event', 'policy', 'user', 'class', 'data', 'page'];
const pageKeywords = ['name', 'text', 'input', 'password', 'button']

// @ts-ignore
CodeMirror.registerHelper('hint', 'fulibWorkflows', (cm) => {
  const cur = cm.getCursor();
  const range = cm.findWordAt(cur);
  let start = range.anchor.ch;
  let end = range.head.ch;

  // Get Current Word
  const word = cm.getRange(range.anchor, range.head);

  // TODO Check context

  // TODO Check if `- ` needed

  // TODO Check if `: ` needed

  // Filter Keywords for possible completions for the current word
  const result: string[] = [];
  for (const noteKeyword of noteKeywords) {
    if (!word || word === ' ' || noteKeyword.indexOf(word) === 0) {
      result.push(noteKeyword);
    }
  }

  return {
    list: result,
    from: CodeMirror.Pos(cur.line, start),
    to: CodeMirror.Pos(cur.line, end),
  }
});

CodeMirror.commands.autocomplete = (cm) => {
  // @ts-ignore
  CodeMirror.showHint(cm, CodeMirror.hint.fulibWorkflows);
}
