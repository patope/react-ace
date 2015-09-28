'use strict';

var ace = require('brace');
var React = require('react');

export default class ReactAce extends React.Component {

  constructor() {
    super();
    this.state = {
      value: '',
      cursorPosition: null,
      selection: null
    };
  }

  static get displayName() {
    return 'ReactAce';
  }

  static get propTypes() {
    return {
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
    };
  }

  static get defaultProps() {
    return {
      name: 'brace-editor',
      mode: '',
      theme: '',
      style: {
        height: '500px',
        width: '500px'
      },
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
  }

  onChange() {
    var value = this._getEditor().getValue();
    this.setState({value});
  }
  onFocus() {
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  }
  onBlur() {
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }
  onCopy(text) {
    if (this.props.onCopy) {
      this.props.onCopy(text);
    }
  }
  onPaste(text) {
    if (this.props.onPaste) {
      this.props.onPaste(text);
    }
  }
  onChangeSelection(event,selection) {
    this.setState({selection: selection.getAllRanges()});
  }
  onChangeCursor(event,selection) {
    this.setState({cursorPosition: selection.getCursor()});
  }

  _getEditor() {
    return ace.edit(this.refs.ace);
  }

  componentDidMount() {
    let editor = ace.edit(this.refs.ace);
    if (this.props.onBeforeLoad) {
      this.props.onBeforeLoad(ace);
    }

    var editorProps = Object.keys(this.props.editorProps);
    for (var i = 0; i < editorProps.length; i++) {
      editor[editorProps[i]] = this.props.editorProps[editorProps[i]];
    }

    editor.setValue(this.props.value);
    editor.getSession().setMode('ace/mode/' + this.props.mode);
    editor.setTheme('ace/theme/' + this.props.theme);
    editor.setFontSize(this.props.fontSize);
    editor.renderer.setShowGutter(this.props.showGutter);
    editor.setOption('maxLines', this.props.maxLines);
    editor.setOption('readOnly', this.props.readOnly);
    editor.setOption('highlightActiveLine', this.props.highlightActiveLine);
    editor.setOption('tabSize', this.props.tabSize);
    editor.setShowPrintMargin(this.props.setShowPrintMargin);
    editor.getSession().setUseWrapMode(this.props.wrapEnabled);
    editor.renderer.setShowGutter(this.props.showGutter);
    editor.getSession().getSelection().on('changeSelection', this.onChangeSelection.bind(this));
    editor.getSession().getSelection().on('changeCursor', this.onChangeCursor.bind(this));
    editor.on('focus', this.onFocus.bind(this));
    editor.on('blur', this.onBlur.bind(this));
    editor.on('copy', this.onCopy.bind(this));
    editor.on('paste', this.onPaste.bind(this));
    editor.on('change', this.onChange.bind(this));

    if (this.props.onLoad) {
      this.props.onLoad(editor);
    }
  }

  componentWillReceiveProps(nextProps) {
    let editor = ace.edit(this.refs.ace);

    // only update props if they are changed
    if (nextProps.mode !== this.props.mode) {
        editor.getSession().setMode('ace/mode/' + nextProps.mode);
    }
    if (nextProps.theme !== this.props.theme) {
        editor.setTheme('ace/theme/' + nextProps.theme);
    }
    if (nextProps.fontSize !== this.props.fontSize) {
        editor.setFontSize(nextProps.fontSize);
    }
    if (nextProps.maxLines !== this.props.maxLines) {
        editor.setOption('maxLines', nextProps.maxLines);
    }
    if (nextProps.readOnly !== this.props.readOnly) {
        editor.setOption('readOnly', nextProps.readOnly);
    }
    if (nextProps.highlightActiveLine !== this.props.highlightActiveLine) {
        editor.setOption('highlightActiveLine', nextProps.highlightActiveLine);
    }
    if (nextProps.tabSize !== this.props.tabSize) {
        editor.setOption('tabSize', nextProps.tabSize);
    }
    if (nextProps.setShowPrintMargin !== this.props.setShowPrintMargin) {
        editor.setShowPrintMargin(nextProps.setShowPrintMargin);
    }
    if (nextProps.wrapEnabled !== this.props.wrapEnabled) {
        editor.getSession().setUseWrapMode(nextProps.wrapEnabled);
    }
    if (this.props.value !== nextProps.value && nextProps.value != this.state.value) {
      editor.setValue(nextProps.value);
    }
    if (nextProps.showGutter !== this.props.showGutter) {
        editor.renderer.setShowGutter(nextProps.showGutter);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.onChange && prevState.value !== this.state.value) {
      this.props.onChange(this.state.value);
    }
    if (this.props.onChangeCursor && prevState.cursorPosition !== this.state.cursorPosition) {
      this.props.onChangeCursor(this.state.cursorPosition);
    }
    if (this.props.onChangeSelection && prevState.selection !== this.state.selection) {
      this.props.onChangeSelection(this.state.selection);
    }
  }

  render() {
    return (
      <div id={this.props.name}
        ref='ace'
        className={this.props.className}
        style={this.props.style}>
      </div>
    );
  }
}
