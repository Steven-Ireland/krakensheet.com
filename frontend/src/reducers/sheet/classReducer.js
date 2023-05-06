import * as actionTypes from '../../actions/actionTypes';

export default (state = [{ level: 1 }], action) => {
  let newState = [...state];

  switch (action.type) {
    case actionTypes.SELECT_CLASS:
      newState = [...state];
      newState[action.index] = {
        ...newState[action.index],
        classDef: action.classDef
      };

      return newState;
    case actionTypes.UPDATE_CLASS_LEVEL:
      newState = [...state];
      newState[action.index] = {
        ...newState[action.index],
        level: action.level
      };

      return newState;

    case actionTypes.UPDATE_CLASS:
      newState = [...state];
      newState[action.index] = {
        ...newState[action.index],
        classDef: {
          ...newState[action.index].classDef,
          [action.field]: action.value
        }
      };

      return newState;
    default:
      return state;
  }
};
