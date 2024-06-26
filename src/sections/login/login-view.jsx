import * as yup from 'yup';
import useStore from '@/store';
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import useGoogleLogin from '@/hooks/use-google-login';
import { yupResolver } from '@hookform/resolvers/yup';
import { login } from '@/api/normal-apis/authentication/auth-apis';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const schema = yup
  .object()
  .shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
  })
  .required();

export default function LoginView() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const setProfile = useStore((state) => state.setProfile);
  const setLoading = useStore((state) => state.setLoading);

  const handleSuccessLogin = (loginRet) => {
    if (!loginRet?.token?.access_token || !loginRet?.token?.refresh_token) {
      enqueueSnackbar('Token is not foud !!!', { variant: 'error' });
    } else if (!loginRet?.profile) {
      enqueueSnackbar('User is not found !!!', { variant: 'error' });
    } else {
      enqueueSnackbar('Login successfully', { variant: 'success' });
      localStorage.setItem('access_token', loginRet.token.access_token);
      localStorage.setItem('refresh_token', loginRet.token.refresh_token);
      setProfile(loginRet.profile);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await login(data);
      const loginRet = response?.data?.data;
      handleSuccessLogin(loginRet);
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const { handleGoogle } = useGoogleLogin((loginRet) => {
    handleSuccessLogin(loginRet);
  });

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleGoogle,
      });

      google.accounts.id.renderButton(document.getElementById('btnLoginGoogle'), {
        scope: 'profile email',
        width: 300,
        height: 80,
        longtitle: true,
        theme: 'dark',
      });
    }
  }, [handleGoogle]);

  const renderForm = (
    <>
      <Stack spacing={2}>
        <TextField
          name="username"
          label="Username"
          {...register('username')}
          error={!!errors.username}
        />
        <p className="text-red-600 text-sm">{errors.username?.message}</p>

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...register('password')}
          error={!!errors.password}
        />
        <p className="text-red-600 text-sm">{errors.password?.message}</p>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link to="/forgot-password" className="cursor-pointer text-blue-600">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleSubmit(onSubmit)}
      >
        Login
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign in to Minimal</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Don’t have an account?
            <Link to="/register" className="cursor-pointer text-blue-600">
              Get started
            </Link>
          </Typography>

          <Button className="w-full" id="btnLoginGoogle" />

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
