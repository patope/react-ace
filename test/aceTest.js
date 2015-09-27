'use strict';

jest.dontMock('../src/ace');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

describe('ace', function () {
  const ReactAce = require('../src/ace');

  it('should render div tag with name as id', function () {
    var editor = TestUtils.renderIntoDocument(<ReactAce value='' name='mock-edit'/>);
    var editorDOMNode = ReactDOM.findDOMNode(editor.refs.ace);
    expect(editorDOMNode.tagName).toEqual('DIV');
    expect(editorDOMNode.getAttribute('id')).toEqual('mock-edit');
  });
});
