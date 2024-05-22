import ApiPaths from '@/constants/api-paths';
import privateAxios from '@/api/private-axios';

export const getMyProfile = () => privateAxios.get(ApiPaths.PROFILE);
