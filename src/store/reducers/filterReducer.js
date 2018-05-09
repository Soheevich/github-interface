import * as actionsTypes from '../actions/actionTypes';

const initialState = {
  author: null,
  repositories: null,
  selectedRepository: null,
  issues: null,
  loading: false
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SELECT_AUTHOR:
      return {
        ...state,
        author: action.author
      };
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
      return {
        ...state,
        loading: true
      };
    case actionTypes.FETCH_ISSUES_SUCCESS:
      return {
        ...state,
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