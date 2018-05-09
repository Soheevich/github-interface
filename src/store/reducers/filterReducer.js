import * as actionsTypes from '../actions/actionTypes';

const initialState = {
  issues: null
};

const filterReducer = (state = initialState, actionTypes) => {
  switch (actionTypes) {
    case actionTypes.FETCH_ISSUES_START:
      return {
        ...state
      };
    case actionTypes.FETCH_ISSUES_SUCCESS:
      return {
        ...state
      };
    case actionTypes.FETCH_ISSUES_FAIL:
      return {
        ...state
      };
    default:
      return {
        ...state
      };
  }
};

export default filterReducer;