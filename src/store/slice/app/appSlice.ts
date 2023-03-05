import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

interface IApp {
  loadingApp: boolean;
  isSwitchAccount: boolean;
}

const initialState: IApp = {
  loadingApp: false,
  isSwitchAccount: false,
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
    setIsSwitchAccount: (state, action) => {
      state.isSwitchAccount = action.payload;
    },
  },
});
export const {startLoading, endLoading, setIsSwitchAccount, setIsLoginAccount} =
  appSlice.actions;

export default appSlice.reducer;
