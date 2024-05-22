import publicAxios from '@/api/public-axios';
import ApiPaths from '@/constants/api-paths';

export const login = ({ username, password }) =>
  publicAxios.post(ApiPaths.AUTH_LOGIN, {
    username,
    password,
  });

export const loginWithGoogle = ({ tokenId }) =>
  publicAxios.post(ApiPaths.AUTH_LOGIN_GOOGLE, { tokenId });

export const registerAccount = ({ username, name, email, password }) =>
  publicAxios.post(ApiPaths.AUTH_REGISTER, {
    username,
    name,
    email,
    password,
  });

export const renewPassword = ({ username, password }) =>
  publicAxios.post(ApiPaths.AUTH_RESET_PASSWORD, {
    username,
    password,
  });

export const confirmRegistration = ({ id }) =>
  publicAxios.post(ApiPaths.AUTH_REGISTER_CONFIRMATION, {
    id,
  });

export const confirmRenewPassword = ({ id }) =>
  publicAxios.post(ApiPaths.AUTH_RESET_PASSWORD_CONFIRMATION, {
    id,
  });
