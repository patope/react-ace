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
    onPaste: React.PropTypes.func,
    value: React.PropTypes.string,
    onLoad: React.PropTypes.func,
    maxLines: React.PropTypes.number,
    readOnly: React.PropTypes.bool,
    highlightActiveLine: React.PropTypes.bool,
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
      cursorStart: 1,
      selectFirstLine: false,
      wrapEnabled: false,
      editorProps: {}
    };
  },
  onChange: function() {
    if (this.props.onChange) {
      var value = this.editor.getValue();
      var cursorPosition = this.editor.getCursorPosition();
      this.props.onChange(value, cursorPosition);
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
  onPaste: function(text) {
    if (this.props.onPaste) {
      this.props.onPaste(text);
    }
  },
  componentDidMount: function() {
    this.editor = ace.edit(this.props.name);

    var editorProps = Object.keys(this.props.editorProps);
    for (var i = 0; i < editorProps.length; i++) {
      this.editor[editorProps[i]] = this.props.editorProps[editorProps[i]];
    }

    this.editor.getSession().setMode('ace/mode/' + this.props.mode);
    this.editor.setTheme('ace/theme/' + this.props.theme);
    this.editor.setFontSize(this.props.fontSize);
    this.editor.on('change', this.onChange);
    this.editor.on('paste', this.onPaste);
    this.editor.on('changeSelection', this.onChangeSelection);
    this.editor.on('changeCursor', this.onChangeCursor);
    this.editor.setValue(this.props.value, this.props.cursorStart);
    this.editor.setValue(this.props.defaultValue || this.props.value, (this.props.selectFirstLine === true ? -1 : null), this.props.cursorStart);
    this.editor.renderer.setShowGutter(this.props.showGutter);
    this.editor.setOption('maxLines', this.props.maxLines);
    this.editor.setOption('readOnly', this.props.readOnly);
    this.editor.setOption('highlightActiveLine', this.props.highlightActiveLine);
    this.editor.setShowPrintMargin(this.props.setShowPrintMargin);
    this.editor.getSession().setUseWrapMode(this.props.wrapEnabled);
    this.editor.renderer.setShowGutter(this.props.showGutter);

    if (this.props.onLoad) {
      this.props.onLoad(this.editor);
    }
  },

  componentWillUnmount: function() {
    this.editor = null;
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    return false;
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
        this.editor.setValue(nextProps.value, (this.props.selectFirstLine === true ? -1 : null));
        if(currentRange && typeof currentRange === "object") {
            this.editor.getSession().getSelection().setSelectionRange(currentRange);
        }
    }
    if (nextProps.showGutter !== this.props.showGutter) {
        this.editor.renderer.setShowGutter(nextProps.showGutter);
    }
  },
  render: function() {
    var attrs = {
      style : {}
    };
    if (this.props.width) {
      attrs.style.width = this.props.width;
    }
    if (this.props.height) {
      attrs.style.height = this.props.height;
    }
    var className = this.props.className;
    return (
      <div id={this.props.name}
        className={className}
        onChange={this.onChange}
        onPaste={this.onPaste}
        {...attrs}>
      </div>
    );
  }
});
