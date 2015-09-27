'use strict';

var ace = require('brace');
var React = require('react');

module.exports = React.createClass({
  displayName: 'ReactAce',

  propTypes: {
    mode: React.PropTypes.string,
    theme: React.PropTypes.string,
    name: React.PropTypes.string,
    className: React.PropTypes.string,
    height: React.PropTypes.string,
    width: React.PropTypes.string,
    fontSize: React.PropTypes.number,
    showGutter: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    onCopy: React.PropTypes.func,
    onPaste: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    value: React.PropTypes.string,
    onLoad: React.PropTypes.func,
    onBeforeLoad: React.PropTypes.func,
    onChangeSelection: React.PropTypes.func,
    onChangeCursor: React.PropTypes.func,
    maxLines: React.PropTypes.number,
    readOnly: React.PropTypes.bool,
    highlightActiveLine: React.PropTypes.bool,
    tabSize: React.PropTypes.number,
    showPrintMargin: React.PropTypes.bool,
    cursorStart: React.PropTypes.number,
    editorProps: React.PropTypes.object
  },
  getDefaultProps: function() {
    return {
      name: 'brace-editor',
      mode: '',
      theme: '',
      height: '500px',
      width: '500px',
      defaultValue: '',
      value: '',
      fontSize: 12,
      showGutter: true,
      onChange: null,
      onChangeSelection: null,
      onPaste: null,
      onLoad: null,
      maxLines: null,
      readOnly: false,
      highlightActiveLine: true,
      showPrintMargin: true,
      tabSize: 4,
      cursorStart: 1,
      selectFirstLine: false,
      wrapEnabled: false,
      editorProps: {}
    };
  },
  onChange: function() {
    var value = this.editor.getValue();
    if (this.props.onChange && !this.silent) {
      this.props.onChange(value);
    }
  },
  onFocus: function() {
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  },
  onBlur: function() {
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  },
  onCopy: function(text) {
    if (this.props.onCopy) {
      this.props.onCopy(text);
    }
  },
  onPaste: function(text) {
    if (this.props.onPaste) {
      this.props.onPaste(text);
    }
  },
  onChangeSelection() {
    if (this.props.onChangeSelection) {
      this.props.onChangeSelection(this.editor.getSelectedText());
    }
  },
  onChangeCursor() {
    if (this.props.onChangeCursor) {
      this.props.onChangeCursor(this.editor.getCursorPosition());
    }
  },
  componentDidMount: function() {
    this.editor = ace.edit(this.refs.ace);
    if (this.props.onBeforeLoad) {
      this.props.onBeforeLoad(ace);
    }

    var editorProps = Object.keys(this.props.editorProps);
    for (var i = 0; i < editorProps.length; i++) {
      this.editor[editorProps[i]] = this.props.editorProps[editorProps[i]];
    }

    this.editor.getSession().setMode('ace/mode/' + this.props.mode);
    this.editor.setTheme('ace/theme/' + this.props.theme);
    this.editor.setFontSize(this.props.fontSize);
    // this.editor.setValue(this.props.defaultValue || this.props.value, (this.props.selectFirstLine === true ? -1 : null), this.props.cursorStart);
    this.editor.renderer.setShowGutter(this.props.showGutter);
    this.editor.setOption('maxLines', this.props.maxLines);
    this.editor.setOption('readOnly', this.props.readOnly);
    this.editor.setOption('highlightActiveLine', this.props.highlightActiveLine);
    this.editor.setOption('tabSize', this.props.tabSize);
    this.editor.setShowPrintMargin(this.props.setShowPrintMargin);
    this.editor.getSession().setUseWrapMode(this.props.wrapEnabled);
    this.editor.renderer.setShowGutter(this.props.showGutter);
    this.editor.on('changeSelection', this.onChangeSelection);
    this.editor.on('changeCursor', this.onChangeCursor);
    this.editor.on('focus', this.onFocus);
    this.editor.on('blur', this.onBlur);
    this.editor.on('copy', this.onCopy);
    this.editor.on('paste', this.onPaste);
    this.editor.on('change', this.onChange);

    if (this.props.onLoad) {
      this.props.onLoad(this.editor);
    }
  },

  componentWillUnmount: function() {
    this.editor = null;
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    return !(nextProps.style === this.props.style
      && nextProps.className === this.props.className
      && nextProps.name === this.props.name
    );
  },
  componentWillReceiveProps: function(nextProps) {
    let currentRange = this.editor.selection.getRange();

    // only update props if they are changed
    if (nextProps.mode !== this.props.mode) {
        this.editor.getSession().setMode('ace/mode/' + nextProps.mode);
    }
    if (nextProps.theme !== this.props.theme) {
        this.editor.setTheme('ace/theme/' + nextProps.theme);
    }
    if (nextProps.fontSize !== this.props.fontSize) {
        this.editor.setFontSize(nextProps.fontSize);
    }
    if (nextProps.maxLines !== this.props.maxLines) {
        this.editor.setOption('maxLines', nextProps.maxLines);
    }
    if (nextProps.readOnly !== this.props.readOnly) {
        this.editor.setOption('readOnly', nextProps.readOnly);
    }
    if (nextProps.highlightActiveLine !== this.props.highlightActiveLine) {
        this.editor.setOption('highlightActiveLine', nextProps.highlightActiveLine);
    }
    if (nextProps.setShowPrintMargin !== this.props.setShowPrintMargin) {
        this.editor.setShowPrintMargin(nextProps.setShowPrintMargin);
    }
    if (nextProps.wrapEnabled !== this.props.wrapEnabled) {
        this.editor.getSession().setUseWrapMode(nextProps.wrapEnabled);
    }
    if (nextProps.value && this.editor.getValue() !== nextProps.value) {
        // editor.setValue is a synchronous function call, change event is emitted before setValue return.
        this.silent = true;
        this.editor.setValue(nextProps.value, (this.props.selectFirstLine === true ? -1 : null));
        if(currentRange && typeof currentRange === "object") {
            this.editor.getSession().getSelection().setSelectionRange(currentRange);
        }
        this.silent = false;
    }
    if (nextProps.showGutter !== this.props.showGutter) {
        this.editor.renderer.setShowGutter(nextProps.showGutter);
    }
  },
  render: function() {
    return (
      <div id={this.props.name}
        ref='ace'
        className={this.props.className}
        style={this.props.style}>
      </div>
    );
  }
});
