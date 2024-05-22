import { Helmet } from 'react-helmet-async';
import RegisterView from '@/sections/register/register-view';


// ----------------------------------------------------------------------

export default function RegisterPage() {
  return (
    <>
      <Helmet>
        <title> Register | Mega Database </title>
      </Helmet>

      <RegisterView />
    </>
  );
}
