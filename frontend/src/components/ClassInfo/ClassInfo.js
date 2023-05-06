import './ClassInfo.css';

import { updateClass } from 'actions/classActions';
import { Tag } from 'antd';
import AuxButtons from 'components/AuxButtons/AuxButtons';
import debounce from 'debounce';
import {
  ContentState,
  Editor,
  EditorState,
  KeyBindingUtil,
  Modifier,
  RichUtils,
  convertToRaw,
  getDefaultKeyBinding
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import React, { Component } from 'react';
import { connect } from 'react-redux';

const ClassInfoMenu = () => {
  return (
    <div className="InfoMenu">
      <p>
        This section is a rich text editor - meaning you can bold, erase, copy,
        paste or otherwise modify it as you see fit. Until we support
        archetypes, we encourage you edit class features freely - make it your
        own.
      </p>
      <p>
        <Tag>Ctrl + H</Tag> Toggle Header
      </p>
      <p>
        <Tag>Ctrl + B</Tag> Bold Text
      </p>
      <p>
        <Tag>Ctrl + I</Tag> Italic Text
      </p>
    </div>
  );
};

class ClassInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
      currentHTML: ''
    };
  }

  componentDidMount() {
    if (this.props.classes[0].classDef !== null) {
      this.loadEditorWithContents(this.props.classes[0].classDef.features);
    }
  }

  loadEditorWithContents = htmlContent => {
    console.log('loading');
    const htmlBlocks = htmlToDraft(htmlContent);

    const { contentBlocks, entityMap } = htmlBlocks;
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    );

    this.setState({
      editorState: EditorState.push(this.state.editorState, contentState),
      currentHTML: htmlContent
    });
  };

  componentDidUpdate(prevProps) {
    const classDef = this.props.classes[0].classDef;
    if (
      this.props !== prevProps &&
      classDef &&
      classDef.features !== this.state.currentHTML
    ) {
      this.loadEditorWithContents(classDef.features);
    }
  }

  onChange = value => {
    const newHtml = draftToHtml(convertToRaw(value.getCurrentContent()));

    this.setState({
      editorState: value,
      currentHTML: newHtml
    });

    this.updateClassInfo(newHtml);
  };

  handleKeyCommand = (command, editorState) => {
    // Custom commands
    if (command === 'toggle-header') {
      const newState = RichUtils.toggleBlockType(editorState, 'header-three');
      this.onChange(newState);
      return 'handled';
    } else {
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        this.onChange(newState);
        return 'handled';
      }
    }
    return 'not-handled';
  };

  keyBindingFn = e => {
    const { hasCommandModifier } = KeyBindingUtil;
    if (e.keyCode === 72 && hasCommandModifier(e)) {
      return 'toggle-header';
    }

    return getDefaultKeyBinding(e);
  };

  onTab = e => {
    const tabCharacter = '    ';
    e.preventDefault();

    let currentState = this.state.editorState;
    let newContentState = Modifier.replaceText(
      currentState.getCurrentContent(),
      currentState.getSelection(),
      tabCharacter
    );

    this.setState({
      editorState: EditorState.push(
        currentState,
        newContentState,
        'insert-characters'
      )
    });
  };

  render() {
    const myClass = this.props.classes[0].classDef;

    if (myClass) {
      return (
        <div className="ClassInfo Section Floaty">
          <p className="SectionTitle">{myClass.name}</p>

          <div className="ClassInfoContaner">
            <Editor
              value={this.state.editorState}
              onChange={this.onChange}
              editorState={this.state.editorState}
              handleKeyCommand={this.handleKeyCommand}
              onTab={this.onTab}
              keyBindingFn={this.keyBindingFn}
            />
          </div>
          {myClass.copyright && (
            <p className="Copyright">
              <span className="Detail">Copyright: </span>
              {myClass.copyright}
            </p>
          )}

          <AuxButtons infoMenuTitle="Controls" infoMenu={<ClassInfoMenu />} />
        </div>
      );
    } else {
      return <div />;
    }
  }

  updateClassInfo = debounce(newHtml => {
    const { dispatch } = this.props;

    if (this.props.classes[0].classDef.features !== newHtml) {
      dispatch(updateClass(0, 'features', newHtml));
    }
  }, 500);
}

export default connect(state => ({ classes: state.sheet.character.classes }))(
  ClassInfo
);
