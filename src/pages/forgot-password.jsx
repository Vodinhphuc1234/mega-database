import { Helmet } from 'react-helmet-async';
import { ForgotPasswordView } from '@/sections/forgot-password';


// ----------------------------------------------------------------------

export default function ForgotPasswordPage() {
  return (
    <>
      <Helmet>
        <title> Forgot password | Mega Database </title>
      </Helmet>

      <ForgotPasswordView />
    </>
  );
}
