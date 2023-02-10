import {createSlice, configureStore} from '@reduxjs/toolkit';

interface IFriend {
  profileFriend?: any;
}
const initialState: IFriend = {
  profileFriend: {},
};

export const counterSlice = createSlice({
  name: 'ProfileFriend',
  initialState,
  reducers: {
    addProfileFriend: (state, action) => {
      state.profileFriend = action.payload;
    },
  },
});
export const {addProfileFriend} = counterSlice.actions;

export default counterSlice.reducer;
