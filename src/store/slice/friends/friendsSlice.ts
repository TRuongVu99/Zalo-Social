import {createSlice, configureStore} from '@reduxjs/toolkit';

interface IFriend {
  listFriends: any;
}
const initialState: IFriend = {
  listFriends: [],
};

export const counterSlice = createSlice({
  name: 'Friends',
  initialState,
  reducers: {
    addFriends: (state, action) => {
      state.listFriends = action.payload;
    },
  },
});
export const {addFriends} = counterSlice.actions;

export default counterSlice.reducer;
