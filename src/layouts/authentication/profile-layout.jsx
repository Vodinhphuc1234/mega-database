import useStore from '@/store';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { getMyProfile } from '@/api/private-apis/profile-apis';

export default function ProfileLayout() {
  const { setProfile, setLoading, isLoading } = useStore((state) => state);

  useEffect(() => {
    const handleProfile = async () => {
      setLoading(true);
      try {
        const profileResponse = await getMyProfile();
        setProfile(profileResponse?.data?.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    handleProfile();
  }, [setLoading, setProfile]);
  return !isLoading && <Outlet />;
}
