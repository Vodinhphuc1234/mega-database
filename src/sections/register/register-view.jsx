// eslint-disable-next-line import/no-extraneous-dependencies
import * as yup from 'yup';
import useStore from '@/store';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerAccount } from '@/api/normal-apis/authentication/auth-apis';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { LoadingButton } from '@mui/lab';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
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
    name: yup.string().required('Name is required'),
    password: yup.string().required('Password is required'),
    confirmedPassword: yup
      .string()
      .required('Confirm Password is required')
      .oneOf([yup.ref('password')], 'Passwords must match'),
    email: yup.string().required('Email is required'),
  })
  .required();
export default function RegisterView() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const setLoading = useStore((state) => state.setLoading);
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await registerAccount(data);
      enqueueSnackbar('Register successfully, check your mail box.', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);

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
        <TextField name="name" label="Name" {...register('name')} error={!!errors.name} />
        <p className="text-red-600 text-sm">{errors.name?.message}</p>
        <TextField
          name="email"
          label="Email address"
          {...register('email')}
          error={!!errors.email}
        />
        <p className="text-red-600 text-sm">{errors.email?.message}</p>

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
        <TextField
          name="confirmedPassword"
          label="Confirm password again"
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
          {...register('confirmedPassword')}
          error={!!errors.confirmedPassword}
        />
        <p className="text-red-600 text-sm">{errors.confirmedPassword?.message}</p>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleSubmit(onSubmit)}
      >
        Register
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
          <Typography variant="h4">Sign up to Mega Database</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Did you have an account?
            <Link to="/login" className="cursor-pointer text-blue-600">
              Sign in
            </Link>
          </Typography>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
