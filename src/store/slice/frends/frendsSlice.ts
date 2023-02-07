import {createSlice, configureStore} from '@reduxjs/toolkit';

interface IFriend {
  listFrends: any;
}
const initialState: IFriend = {
  listFrends: [],
};

export const counterSlice = createSlice({
  name: 'Friends',
  initialState,
  reducers: {
    addFrends: (state, action) => {
      state.listFrends.push(action.payload);
    },
  },
});
export const {addFrends} = counterSlice.actions;

export default counterSlice.reducer;
