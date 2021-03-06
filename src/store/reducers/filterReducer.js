import * as actionTypes from '../actions/actionTypes';

const initialState = {
  repositories: null,
  selectedRepository: null,
  issues: null,
  loading: false,
  error: false,
  inputs: {
    owner: {
      name: 'Owner',
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Owner'
      },
      value: ''
    },
    repository: {
      name: 'Repository',
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Repository'
      },
      value: ''
    },
    issuesPerPage: {
      name: 'Issues per Page',
      elementType: 'select',
      elementConfig: {
        options: [
          { value: 20, displayValue: '20' },
          { value: 30, displayValue: '30' },
          { value: 40, displayValue: '40' }
        ]
      },
      value: 20
    }
  },
  list: {
    currentPage: 1,
    totalPages: null
  }
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_INPUTS:
      // console.log('[reducer set input] input', action.input);
      const key = Object.keys(action.input)[0];

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [key]: {
            ...state.inputs[key],
            value: action.input[key].value
          }
        }
      };
    case actionTypes.FETCH_REPOSITORIES_START:
      return {
        ...state,
      };
    case actionTypes.FETCH_REPOSITORIES_SUCCESS:
      return {
        ...state,
        repositories: action.repositories,
      };
    case actionTypes.FETCH_REPOSITORIES_FAIL:
      return {
        ...state,
        error: action.error
      };
    case actionTypes.FETCH_ISSUES_START:
      return {
        ...state,
        loading: true,
        error: false
      };
    case actionTypes.FETCH_ISSUES_SUCCESS:
      // console.log('issues', action.list);
      return {
        ...state,
        issues: action.issues,
        list: {
          ...state.list,
          ...action.list,
          currentPage: action.page
        },
        loading: false
      };
    case actionTypes.FETCH_ISSUES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return {
        ...state
      };
  }
};

export default filterReducer;
