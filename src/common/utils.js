import axios from 'axios';

const baseURL = `${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}`;

// eslint-disable-next-line import/prefer-default-export
export const TLPBackend = axios.create({
  baseURL,
  withCredentials: true,
});
