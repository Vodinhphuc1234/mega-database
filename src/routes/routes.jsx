import AppPage from '@/pages/app';
import UserPage from '@/pages/user';

import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const routes = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: icon('ic_analytics'),
    component: <AppPage />,
  },
  {
    path: '/user',
    title: 'User',
    icon: icon('ic_user'),
    component: <UserPage />,
  },
];

export default routes;
