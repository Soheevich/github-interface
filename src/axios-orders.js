import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.giethub.com',
  headers: { Accept: 'application/vnd.github.v3+json' }
});

export default instance;