import {data} from './../../../screens/Home/ Personal/data/index';
import {
  createSlice,
  configureStore,
  createAsyncThunk,
  PayloadAction,
  AnyAction,
} from '@reduxjs/toolkit';
import firestore, {firebase} from '@react-native-firebase/firestore';

interface IUser {
  profileUser: {
    username?: string | undefined;
    numberPhone?: string | undefined;
    uid?: string | undefined;
    listFriend?: any;
    UserId?: string | undefined;
    avatar?: string | undefined;
    listFriendInvitations?: any;
    timeStamp?: string;
    background?: string | undefined;
  };
  option?: string;
}
const initialState: IUser = {
  profileUser: {},
  option: 'fade',
};

export const getUserProfile = createAsyncThunk(
  'user/getUserProfile',
  async (params: any, thunkAPI) => {
    // Filter results
    const dataUser = await firestore()
      .collection('Users')
      .where('uid', '==', params?.uid as string)
      .get()
      .then(querySnapshot => {
        let profile: any = {};
        querySnapshot.forEach(snapshot => {
          profile = {...snapshot.data(), UserId: snapshot.id};
        });
        return profile;
      })
      .catch(_err => {
        return {
          profile: {},
        };
      });

    return dataUser;
  },
);
interface IAddFrendByPhoneNumber {
  UserIdFriend: string;
  friend: any;
}
export const addFrendByPhoneNumber = createAsyncThunk(
  'user/addFrendByPhoneNumber',
  async (params: any, thunkAPI) => {
    const result = firestore()
      .collection('Users')
      .doc(params.UserIdFriend as string)
      .update({
        listFriend: firestore.FieldValue.arrayUnion(params.friend),
      })
      .then(() => {
        console.log('User updated!');
      });
  },
);

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
  extraReducers(builder) {
    //fulfilled
    builder.addCase(getUserProfile.fulfilled, (state: IUser, action) => {
      state.profileUser = action.payload;
    });
  },
});
export const {addUser, addOption} = counterSlice.actions;

export default counterSlice.reducer;
