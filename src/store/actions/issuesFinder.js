import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const selectAuthor = (author) => {
  return {
    type: actionTypes.SELECT_AUTHOR,
    author
  };
};

export const selectRepository = (selectedRepository) => {
  return {
    type: actionTypes.SELECT_REPOSITORY,
    selectedRepository
  };
};

export const fetchRepositoriesSuccess = (repositories) => {
  return {
    type: actionTypes.FETCH_REPOSITORIES_SUCCESS,
    repositories
  };
};

export const fetchRepositoriesFail = (error) => {
  return {
    type: actionTypes.FETCH_REPOSITORIES_FAIL,
    error
  };
};

export const fetchRepositoriesStart = () => {
  return {
    type: actionTypes.FETCH_REPOSITORIES_START
  };
};

export const fetchRepositories = (author) => {
  return (dispatch) => {
    dispatch(fetchRepositoriesStart());
    axios.get(`users/${author}/repos`)
      .then((response) => {
        dispatch(fetchRepositoriesSuccess(response));
      })
      .catch((error) => {
        dispatch(fetchRepositoriesFail(error));
      });
  };
};

export const FETCH_REPOSITORIES_START = 'FETCH_REPOSITORIES_START';
export const FETCH_REPOSITORIES_SUCCESS = 'FETCH_REPOSITORIES_SUCCESS';
export const FETCH_REPOSITORIES_FAIL = 'FETCH_REPOSITORIES_FAIL';

export const FETCH_ISSUES_START = 'FETCH_ISSUES_START';
export const FETCH_ISSUES_SUCCESS = 'FETCH_ISSUES_SUCCESS';
export const FETCH_ISSUES_FAIL = 'FETCH_ISSUES_FAIL';