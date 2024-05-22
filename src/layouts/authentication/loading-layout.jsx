import useStore from '@/store';
import { Outlet } from 'react-router-dom';

import { CircularProgress } from '@mui/material';

export default function LoadingLayout() {
  const isLoading = useStore((state) => state.isLoading);
  return (
    <>
      {isLoading && (
        <div
          style={{
            width: '100vw',
            height: '100vh',
            zIndex: 50,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
          }}
          className="d-flex justify-content-center align-items-center position-fixed"
        >
          <CircularProgress />
        </div>
      )}

      <Outlet />
    </>
  );
}
