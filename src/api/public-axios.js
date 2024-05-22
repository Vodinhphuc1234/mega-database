import axios from 'axios';

const publicAxios = axios.create({
  baseURL: import.meta.env.VITE_BE_URL,
});

export default publicAxios;
