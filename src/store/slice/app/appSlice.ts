import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

interface IApp {
  loadingApp: boolean;
}

const initialState: IApp = {
  loadingApp: false,
};
export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    startLoading: state => {
      state.loadingApp = true;
    },
    endLoading: state => {
      state.loadingApp = false;
    },
  },
});
export const {startLoading, endLoading} = appSlice.actions;

export default appSlice.reducer;
