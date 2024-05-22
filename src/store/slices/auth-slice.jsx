import { login } from '@/api/normal-apis/authentication/auth-apis';

const createAuthSlice = (set) => ({
  user: null,
  login: async ({ username, password }) => {
    const loginResponse = await login({ username, password });
    set({
      user: loginResponse?.data?.data,
    });
  },
  logout: () => {
    set({
      user: null,
    });
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },
  setProfile: (profile) => {
    set({
      user: profile,
    });
  },
});

export default createAuthSlice;
