import useStore from '@/store';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { confirmRegistration } from '@/api/normal-apis/authentication/auth-apis';

// ----------------------------------------------------------------------

export default function VerificationPage() {
  const [searchParams] = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();
  const setLoading = useStore((state) => state.setLoading);
  const setProfile = useStore((state) => state.setProfile);
  useEffect(() => {
    const verifyRegistration = async () => {
      setLoading(true);
      try {
        const response = await confirmRegistration({ id: searchParams.get('verificationId') });
        localStorage.setItem('access_token', response?.data?.data?.token?.access_token);
        localStorage.setItem('refresh_token', response?.data?.data?.token?.refresh_token);
        setProfile(response?.data?.data?.profile);
        enqueueSnackbar('Verify account registration successfully', { variant: 'success' });
      } catch (error) {
        enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      } finally {
        setLoading(false);
      }
    };
    verifyRegistration();
  }, [enqueueSnackbar, searchParams, setLoading, setProfile]);
  return (
    <>
      <Helmet>
        <title> Verification | Mega Database </title>
      </Helmet>

      <h4>Redirecting ...</h4>
    </>
  );
}
