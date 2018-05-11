import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.github.com',
  headers: { Accept: 'application/vnd.github.v3+json' }
});

export default instance;