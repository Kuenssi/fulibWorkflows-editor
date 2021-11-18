import * as CodeMirror from 'codemirror';

const keywords = ["board", "workflow", "subprocess", "boundedContext", "brokerTopic", "externalSystem", "events",
  "service", "port", "command", "event", "policy", "trigger", "class", "data", "action", "query",
  "page", "name", "label", "button", "input", "fill", "password"];

// @ts-ignore
CodeMirror.registerHelper('hint', 'fulibWorkflows', (cm) => {
  const cur = cm.getCursor();
  const start = cur.ch;

  return {
    list: keywords,
    from: CodeMirror.Pos(cur.line, start),
    to: CodeMirror.Pos(cur.line, start),
  }
});

CodeMirror.commands.autocomplete = (cm) => {
  // @ts-ignore
  CodeMirror.showHint(cm, CodeMirror.hint.fulibWorkflows);
}
