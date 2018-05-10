import * as actionTypes from '../actions/actionTypes';

const initialState = {
  repositories: null,
  selectedRepository: null,
  issues: null,
  loading: false
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_REPOSITORIES_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.FETCH_REPOSITORIES_SUCCESS:
      return {
        ...state,
        repositories: action.repositories,
        loading: false
      };
    case actionTypes.FETCH_REPOSITORIES_FAIL:
      return {
        ...state,
        loading: false
      };
    case actionTypes.FETCH_ISSUES_START:
      // console.log('[FETCH_ISSUES_START] Reducer');
      return {
        ...state,
        loading: true
      };
    case actionTypes.FETCH_ISSUES_SUCCESS:
      // console.log('[FETCH_ISSUES_SUCCESS] Reducer - action.issues', action.issues);
      return {
        ...state,
        issues: action.issues,
        loading: false
      };
    case actionTypes.FETCH_ISSUES_FAIL:
      return {
        ...state,
        loading: false
      };
    default:
      return {
        ...state
      };
  }
};

export default filterReducer;