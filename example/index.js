var React = require('react');
var ReactDOM = require('react-dom');
var AceEditor  = require('react-ace');
var brace = require('brace');

require('brace/mode/java');
require('brace/mode/javascript');

require('brace/theme/github');
require('brace/theme/monokai');
require('brace/theme/solarized_light');

renderStuff('function onLoad(editor) { \n  console.log(\"i\'ve loaded\");\n}');
function onLoad(editor) {
  console.log('i\'ve loaded');
}
var state = "";
var cursorPosition = null;

function onChange(newValue) {
  state = newValue;
  renderStuff(state, cursorPosition);
}
function onChangeCursor(newValue) {
  cursorPosition = newValue;
  renderStuff(state, cursorPosition);
}
function onChangeSelection(newValue) {
  console.log(newValue);
}

function renderStuff(value, cursorPosition) {
  // render a first
  ReactDOM.render(
    <AceEditor
      mode="java"
      theme="github"
      name="blah1"
      style={{'height':'6em'}}
      cursorPosition={cursorPosition}
      value={value}
      onChange={onChange}
      onChangeCursor={onChangeCursor}
      onChangeSelection={onChangeSelection}
      editorProps={{$blockScrolling: Infinity}}

    />,
    document.getElementById('example')
  );

  //render a second
  ReactDOM.render(
    <AceEditor
      mode="javascript"
      theme="monokai"
      name="blah2"
      onLoad={onLoad}
      value={value}
      fontSize={14}
      cursorPosition={cursorPosition}
      style={{height:'6em'}}
      onChange={onChange}
      onChangeCursor={onChangeCursor}
      onChangeSelection={onChangeSelection}
      editorProps={{$blockScrolling: Infinity}}
    />,
    document.getElementById('example2')
  );
}
