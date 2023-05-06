export const updateLevel = level => {
  return dispatch => {
    dispatch({
      type: 'UPDATE_CLASS_LEVEL',
      level: level,
      index: 0
    });
  };
};

export const selectClass = classDef => {
  return dispatch => {
    dispatch({
      type: 'SELECT_CLASS',
      classDef: classDef,
      index: 0
    });
  };
};

export const updateClass = (index, field, value) => {
  return dispatch => {
    dispatch({
      type: 'UPDATE_CLASS',
      index: 0,
      field: field,
      value: value
    });
  };
};
