import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


export const setInputs = input => ({
  type: actionTypes.SET_INPUTS,
  input
});

export const fetchRepositoriesSuccess = repositories => {
  // console.log('repositories fetched', repositories);
  return {
    type: actionTypes.FETCH_REPOSITORIES_SUCCESS,
    repositories
  };
};

export const fetchRepositoriesFail = error => ({
  type: actionTypes.FETCH_REPOSITORIES_FAIL,
  error
});

export const fetchRepositoriesStart = () => ({
  type: actionTypes.FETCH_REPOSITORIES_START
});

export const fetchRepositories = (owner, repo) => {
  const repository = repo ? repo + '+' : null;
  const url = repository ?
    `https://api.github.com/search/repositories?q=${repository}user:${owner}` :
    `users/${owner}/repos`;

  return dispatch => {
    dispatch(fetchRepositoriesStart());
    axios
      .get(url)
      .then(response => {
        // console.log('repositories fetch', response);
        const array = repo ? response.data.items : response.data
        const repos = [];
        array.forEach(repo => {
          const { id, name } = repo;
          repos.push({ id, name });
        });
        dispatch(fetchRepositoriesSuccess(repos));
      })
      .catch(error => {
        console.log('error', error);
        dispatch(fetchRepositoriesFail(error));
      });
  };
};

export const fetchIssuesSuccess = (issues, list, page) => ({
  type: actionTypes.FETCH_ISSUES_SUCCESS,
  issues,
  list,
  page
});

export const fetchIssuesFail = error => ({
  type: actionTypes.FETCH_ISSUES_FAIL,
  error
});

export const fetchIssuesStart = () => ({
  type: actionTypes.FETCH_ISSUES_START
});

export const fetchIssues = (owner, repository, page, perPage) => {
  return dispatch => {
    // console.log(`/repos/${owner}/${repository}/issues?page=${page}&per_page=${perPage}`);
    dispatch(fetchIssuesStart());
    axios
      .get(`/repos/${owner}/${repository}/issues?page=${page}&per_page=${perPage}`)
      .then(response => {
        console.log('fetchIssuesSuccess - action', response);
        let issues = [];
        const { headers: { link: headerLink } } = response;
        const totalPages = headerLink ? headerLink.match(/\d+(?=&per_page=\d+>; rel="last")/) : 1;
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

export const selectAutocomplete = (repo, owner, page, perPage) => {
  return (dispatch, getState) => {
    const store = getState();
    console.log(store);
    dispatch(setInputs({ repository: { value: repo } }));
    dispatch(fetchIssues(owner, repo, page, perPage));
  };
};
