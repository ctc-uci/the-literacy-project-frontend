import axios from 'axios';

const baseURL = `${process.env.BACKEND_HOST}:${process.env.BACKEND_PORT}`;

// eslint-disable-next-line import/prefer-default-export
export const TLPBackend = axios.create({
  baseURL,
  withCredentials: true,
});
