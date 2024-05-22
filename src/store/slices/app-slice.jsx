const createAppSlice = (set) => ({
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
});

export default createAppSlice;
