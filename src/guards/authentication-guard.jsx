import useStore from '@/store';
import { Outlet, Navigate } from 'react-router-dom';

export default function AuthenticationGuard() {
  const access_token = localStorage.getItem('access_token');
  const refresh_token = localStorage.getItem('refresh_token');
  const user = useStore((state) => state.user);
  const unAuthenticated = !user || (!access_token && !refresh_token);
  return unAuthenticated ? <Navigate to="/login" /> : <Outlet />;
}
