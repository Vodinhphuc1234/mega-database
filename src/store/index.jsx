import { create } from 'zustand';

import createAppSlice from './slices/app-slice';
import createAuthSlice from './slices/auth-slice';

const useStore = create((...a) => ({
  ...createAuthSlice(...a),
  ...createAppSlice(...a),
}));

export default useStore;
