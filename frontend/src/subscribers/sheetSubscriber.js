import debounce from 'debounce';

import { saveSheet } from '../actions/sheetActions';

let lastState = null;
export default store => {
  lastState = store.getState().sheet.character;

  return debounce(() => {
    const { sheet } = store.getState();
    const character = sheet.character;

    if (lastState !== character && lastState != null && sheet._rev != null) {
      store.dispatch(saveSheet(sheet));
    }

    lastState = character;
  }, 1500);
};
