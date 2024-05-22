// eslint-disable-next-line import/no-extraneous-dependencies
import * as yup from 'yup';
import useStore from '@/store';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
// eslint-disable-next-line import/no-extraneous-dependencies
import { yupResolver } from '@hookform/resolvers/yup';
import { renewPassword } from '@/api/normal-apis/authentication/auth-apis';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
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

export default function ForgotPasswordView() {
  const schema = yup
    .object({
      username: yup.string().required('Username is required'),
      password: yup.string().required('New password is required'),
    })
    .required();

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
      await renewPassword(data);
      enqueueSnackbar('Reset password successfully, check your mail box.', { variant: 'success' });
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
      <Stack
        spacing={2}
        sx={{
          marginTop: 2,
          marginBottom: 2,
        }}
      >
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

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleSubmit(onSubmit)}
      >
        Submit
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
          <Typography variant="h4">Forgot password</Typography>
          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
