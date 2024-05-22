/* eslint-disable perfectionist/sort-imports */
import { Route, Routes, Navigate } from 'react-router-dom';
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import ThemeProvider from 'src/theme';
import LoadingLayout from './layouts/authentication/loading-layout';
import ProfileLayout from './layouts/authentication/profile-layout';
import AuthenticationGuard from './guards/authentication-guard';
import DashboardLayout from './layouts/dashboard';
import routes from './routes/routes';
import AuthenticationLayout from './layouts/authentication/authentication-layout';
import CheckLoginGuard from './guards/checkLogin-guard';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import ForgotPasswordPage from './pages/forgot-password';
import VerificationPage from './pages/verification';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <Routes>
        <Route element={<LoadingLayout />}>
          <Route element={<ProfileLayout />}>
            <Route element={<AuthenticationGuard />}>
              <Route element={<DashboardLayout />}>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                {routes?.map((route) => (
                  <Route key={route?.path} path={route?.path} element={route?.component} />
                ))}
              </Route>
            </Route>
            <Route element={<CheckLoginGuard />}>
              <Route element={<AuthenticationLayout />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="forgot-password" element={<ForgotPasswordPage />} />
                <Route path="verification" element={<VerificationPage />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
