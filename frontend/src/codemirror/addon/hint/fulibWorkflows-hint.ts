import * as CodeMirror from 'codemirror';

const keywords = ['board', 'workflow', 'subprocess', 'boundedContext', 'brokerTopic', 'externalSystem', 'events',
  'service', 'port', 'command', 'event', 'policy', 'trigger', 'class', 'data', 'action', 'query',
  'page', 'name', 'label', 'button', 'input', 'fill', 'password'];

// @ts-ignore
CodeMirror.registerHelper('hint', 'fulibWorkflows', (cm) => {
  const cur = cm.getCursor();
  const range = cm.findWordAt(cur);
  let start = range.anchor.ch;
  let end = range.head.ch;

  // Get Current Word
  const word = cm.getRange(range.anchor, range.head);

  // Filter Keywords for possible completions for the current word
  const result: string[] = [];
  for (const keyword of keywords) {
    if (!word || word === ' ' || keyword.indexOf(word) === 0) {
      result.push(keyword);
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
