import {createSlice, configureStore} from '@reduxjs/toolkit';

interface IUser {
  profileUser: {
    username?: string | undefined;
    phoneNumber?: string | undefined;
    uid?: string | undefined;
    listFriend?: any;
    UserId?: string;
    avatar?: string;
  };
  option?: string;
}
const initialState: IUser = {
  profileUser: {},
  option: 'fade',
};

export const counterSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.profileUser = action.payload;
    },
    addOption: (state, action) => {
      state.option = action.payload;
    },
  },
});
export const {addUser, addOption} = counterSlice.actions;

export default counterSlice.reducer;
