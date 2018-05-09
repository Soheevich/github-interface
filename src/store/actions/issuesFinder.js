import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const selectAuthor = (authorName) => {
  return {
    type: actionTypes.SELECT_AUTHOR,
    authorName
  };
};

export const selectRepository = (selectedRepository) => {
  return {
    type: actionTypes.SELECT_REPOSITORY,
    selectedRepository
  };
};

export const fetchRepositoriesSuccess = (repositories, authorInfo) => {
  return {
    type: actionTypes.FETCH_REPOSITORIES_SUCCESS,
    repositories,
    authorInfo
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
        let repos = [];
        Object.keys(response).forEach((repo) => {
          const {id: id, name: name, owner: owner} = repo;
          repos.push({id, name});
        });
        dispatch(fetchRepositoriesSuccess(repos, owner));
      })
      .catch((error) => {
        dispatch(fetchRepositoriesFail(error));
      });
  };
};

export const FETCH_ISSUES_START = 'FETCH_ISSUES_START';
export const FETCH_ISSUES_SUCCESS = 'FETCH_ISSUES_SUCCESS';
export const FETCH_ISSUES_FAIL = 'FETCH_ISSUES_FAIL';