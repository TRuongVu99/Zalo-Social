import {createSlice, configureStore} from '@reduxjs/toolkit';

interface IUser {
  profileUser: {
    username?: string | undefined;
    phoneNumber?: string | undefined;
    uid?: string | undefined;
  };
}
const initialState: IUser = {
  profileUser: {},
};

export const counterSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.profileUser = action.payload;
    },
  },
});
export const {addUser} = counterSlice.actions;

export default counterSlice.reducer;
