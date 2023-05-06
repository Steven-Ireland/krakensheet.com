import './RaceInfo.scss';

import { updateRace } from 'actions/characterActions';
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
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const RaceInfoMenu = () => {
  return (
    <div className="InfoMenu">
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

const RaceInfo = () => {
  const dispatch = useDispatch();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [currentHTML, setCurrentHTML] = useState('');
  const race = useSelector(state => state.sheet.character.race);
  const raceName = race ? race.name : '';

  useEffect(() => {
    if (race) {
      const htmlBlocks = htmlToDraft(race.features);
      const { contentBlocks, entityMap } = htmlBlocks;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );

      setEditorState(EditorState.push(editorState, contentState));
      setCurrentHTML(race.features);
    }
  }, [raceName]);

  const updateRaceInfo = debounce(newHtml => {
    if (currentHTML !== newHtml) {
      dispatch(updateRace('features', newHtml));
    }
  }, 500);

  const onChange = newEditorState => {
    const newHtml = draftToHtml(
      convertToRaw(newEditorState.getCurrentContent())
    );

    setEditorState(newEditorState);
    setCurrentHTML(newHtml);

    updateRaceInfo(newHtml);
  };

  const handleKeyCommand = (command, editorState) => {
    // Custom commands
    if (command === 'toggle-header') {
      const newState = RichUtils.toggleBlockType(editorState, 'header-three');
      onChange(newState);
      return 'handled';
    } else {
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        onChange(newState);
        return 'handled';
      }
    }
    return 'not-handled';
  };

  const keyBindingFn = e => {
    const { hasCommandModifier } = KeyBindingUtil;
    if (e.keyCode === 72 && hasCommandModifier(e)) {
      return 'toggle-header';
    }

    return getDefaultKeyBinding(e);
  };

  const onTab = e => {
    const tabCharacter = '    ';
    e.preventDefault();

    let currentState = this.state.editorState;
    let newContentState = Modifier.replaceText(
      currentState.getCurrentContent(),
      currentState.getSelection(),
      tabCharacter
    );

    setEditorState(
      EditorState.push(currentState, newContentState, 'insert-characters')
    );
  };

  if (race) {
    return (
      <div className="Section RaceInfo">
        <p className="SectionTitle">Racial</p>

        <div className="RaceInfoContaner">
          <Editor
            value={editorState}
            onChange={onChange}
            editorState={editorState}
            handleKeyCommand={handleKeyCommand}
            onTab={onTab}
            keyBindingFn={keyBindingFn}
          />
        </div>
        {race.copyright && (
          <p className="Copyright">
            <span className="Detail">Copyright: </span>
            {race.copyright}
          </p>
        )}

        <AuxButtons infoMenuTitle="Controls" infoMenu={<RaceInfoMenu />} />
      </div>
    );
  } else {
    return <div />;
  }
};

export default RaceInfo;
