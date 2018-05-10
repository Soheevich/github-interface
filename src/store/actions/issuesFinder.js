import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


export const setInputs = input => {
  return {
    type: actionTypes.SET_INPUTS,
    input
  };
};

export const fetchRepositoriesSuccess = repositories => {
  return {
    type: actionTypes.FETCH_REPOSITORIES_SUCCESS,
    repositories
  };
};

export const fetchRepositoriesFail = error => {
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

export const fetchRepositories = owner => {
  return dispatch => {
    dispatch(fetchRepositoriesStart());
    axios
      .get(`users/${owner}/repos`)
      .then(response => {
        let repos = [];
        Object.keys(response).forEach(repo => {
          const { id, name } = repo;
          repos.push({ id, name });
        });
        dispatch(fetchRepositoriesSuccess(repos));
      })
      .catch(error => {
        dispatch(fetchRepositoriesFail(error));
      });
  };
};

export const fetchIssuesSuccess = issues => {
  return {
    type: actionTypes.FETCH_ISSUES_SUCCESS,
    issues
  };
};

export const fetchIssuesFail = error => {
  return {
    type: actionTypes.FETCH_ISSUES_FAIL,
    error
  };
};

export const fetchIssuesStart = () => {
  return {
    type: actionTypes.FETCH_ISSUES_START
  };
};

export const fetchIssues = (owner, repository) => {
  return dispatch => {
    dispatch(fetchIssuesStart());
    axios
      .get(`/repos/${owner}/${repository}/issues?page=1&per_page=10`)
      .then(response => {
        // console.log('fetchIssuesSuccess - action', response);
        let issues = [];
        response.data.forEach(issue => {
          // console.log('Issues forEach - issue', issue);
          const {
            id,
            title,
            number,
            body,
            created_at: createdAt,
            user: {
              login: userLogin,
              avatar_url: userAvatarUrl,
              html_url: userUrl,
            }
          } = issue;
          issues.push({
            id,
            title,
            number,
            body,
            createdAt,
            user: {
              userLogin,
              userAvatarUrl,
              userUrl
            }
          });
        });
        dispatch(fetchIssuesSuccess(issues));
      })
      .catch(error => {
        // console.log('fetchIssuesFail - action', error);
        dispatch(fetchIssuesFail(error));
      });
  };
};
