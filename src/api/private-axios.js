import mem from 'mem';
import axios from 'axios';

import publicAxios from './public-axios';

const refreshTokenFn = async () => {
  const refreshToken = localStorage.getItem('refresh_token');
  try {
    const response = await publicAxios.post(
      process.env.REACT_APP_REFRESH_TOKEN_API,
      {},
      {
        headers: {
          AUTHORIZATION: `Bearer ${refreshToken}`,
        },
      }
    );
    const token = response.data.data;
    return token;
  } catch (error) {
    return null;
  }
};

const maxAge = 10000;

const memoizedRefreshToken = mem(refreshTokenFn, {
  maxAge,
});

const privateAxios = axios.create();
privateAxios.defaults.baseURL = import.meta.env.VITE_BE_URL;
console.log(import.meta.env.VITE_BE_URL);
privateAxios.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken != null) {
      config.headers = {
        ...config.headers,
        AUTHORIZATION: `Bearer ${accessToken}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

privateAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;

    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;

      const token = await memoizedRefreshToken();

      if (token?.access_token) {
        config.headers = {
          ...config.headers,
          AUTHORIZATION: `Bearer ${token?.access_token}`,
        };
        localStorage.setItem('access_token', token?.access_token);
        localStorage.setItem('refresh_token', token?.refresh_token);
        return privateAxios(config);
      }
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
    return Promise.reject(error);
  }
);
export default privateAxios;
