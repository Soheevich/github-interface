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

export const fetchIssuesSuccess = (issues, list, page) => {
  return {
    type: actionTypes.FETCH_ISSUES_SUCCESS,
    issues,
    list,
    page
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

export const fetchIssues = (owner, repository, page, perPage) => {
  return dispatch => {
    // console.log(`/repos/${owner}/${repository}/issues?page=${page}&per_page=${perPage}`);
    dispatch(fetchIssuesStart());
    axios
      .get(`/repos/${owner}/${repository}/issues?page=${page}&per_page=${perPage}`)
      .then(response => {
        // console.log('fetchIssuesSuccess - action', response);
        let issues = [];
        const { headers: { link: headerLink } } = response;
        const totalPages = headerLink.match(/\d+(?=&per_page=\d+>; rel="last")/);
        const list = {
          currentPage: 1
        };

        if (totalPages) {
          list.totalPages = parseInt(totalPages, 10);
        }

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
        dispatch(fetchIssuesSuccess(issues, list, page));
      })
      .catch(error => {
        console.log('fetchIssuesFail - action', error);
        dispatch(fetchIssuesFail(error));
      });
  };
};
