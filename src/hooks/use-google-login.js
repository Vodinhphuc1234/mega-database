import { useState } from 'react';
import { loginWithGoogle } from '@/api/normal-apis/authentication/auth-apis';

const useGoogleLogin = (handleSuccess) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogle = async (response) => {
    try {
      setLoading(true);
      const loginResponse = await loginWithGoogle({
        tokenId: response?.credential,
      });
      handleSuccess(loginResponse?.data?.data);
    } catch (err) {
      setError(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, handleGoogle };
};

export default useGoogleLogin;
