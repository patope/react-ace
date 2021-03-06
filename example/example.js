var React = require('react');
var ReactDOM = require('react-dom');
var AceEditor  = require('../src/ace');

var brace = require("brace");
require('brace/mode/java')
require('brace/mode/javascript')

require('brace/theme/github')
require('brace/theme/monokai')
require('brace/theme/solarized_light')

function onLoad(editor) {
  console.log('i\'ve loaded');
}

var state = "";
var cursorPosition = null;


function onChange(newValue) {
  state = value;
}

function onChangeCursor(newValue) {
  console.log(newValue);
}
function onChangeSelection(newValue) {
  console.log(newValue);
}


// render a first
ReactDOM.render(
  <AceEditor
    mode="java"
    theme="github"
    name="blah1"
    style={{
        height: "6em"
    }}
    onChange={onChange}
    onChangeCursor={onChangeCursor}
    onChangeSelection={onChangeSelection}
    value={state}
    />,
  document.getElementById('example')
);



var defaultValue = "function onLoad(editor) { \n  console.log(\"i've loaded\");\n}";
//render a second
ReactDOM.render(
  <AceEditor
    mode="javascript"
    theme="monokai"
    name="blah2"
    onLoad={onLoad}
    fontSize={14}
    style={{
        height: "6em"
    }}
    value={state}
  />,
  document.getElementById('example2')
);

global.reloadProps = function () {
  ReactDOM.render(
  <AceEditor mode="javascript" theme="solarized_light" name="blah2" fontSize={40} style={{
      height: "8em"
  }}/>,
  document.getElementById('example2')
);
}
