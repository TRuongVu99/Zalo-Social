import firestore from '@react-native-firebase/firestore';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export interface IUser {
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
export const sendFriendInvitation = createAsyncThunk(
  'user/sendFriendInvitation',
  async (params: any, thunkAPI) => {
    firestore()
      .collection('Users')
      .doc(params?.UserId)
      .update({
        listFriendInvitations: firestore.FieldValue.arrayUnion(
          params.newprofileFriend,
        ),
      })
      .then(() => {
        console.log(`Đã gửi lời mời kết bạn `);
      });
  },
);

interface IAddFrendByPhoneNumber {
  UserIdFriend: string;
  friend: any;
}
export const addFrendByPhoneNumber = createAsyncThunk(
  'user/addFrendByPhoneNumber',
  async (params: IAddFrendByPhoneNumber, thunkAPI) => {
    const result = firestore()
      .collection('Users')
      .doc(params.UserIdFriend)
      .update({
        listFriend: firestore.FieldValue.arrayUnion(params.friend),
      })
      .then(() => {
        console.log('User updated!');
      });
  },
);
interface IHandleUnFriend {
  UserId: string | undefined;
  profileUnFriend: any;
}
export const handleUnFriend = createAsyncThunk(
  'user/handleUnFriend',
  async (params: IHandleUnFriend, thunkAPI) => {
    firestore()
      .collection('Users')
      .doc(params.UserId)
      .update({
        listFriendInvitations: firestore.FieldValue.arrayRemove(
          params.profileUnFriend,
        ),
      })
      .then(() => {
        console.log('User updated!');
      });
  },
);

interface IHandleReject {
  UserId: string | undefined;
  profileReject: any;
}

export const handleReject = createAsyncThunk(
  'user/handleReject',
  async (params: IHandleReject, thunkAPI) => {
    firestore()
      .collection('Users')
      .doc(params.UserId)
      .update({
        listFriend: firestore.FieldValue.arrayRemove(params.profileReject),
      })
      .then(() => {
        console.log('Reject');
      });
  },
);
interface IHandleConfirm {
  numberPhone?: string | undefined;
  profileUser?: any;
  UserId?: string | undefined;
}

export const handleConfirm = createAsyncThunk(
  'user/handleReject',
  async (params: IHandleConfirm, thunkAPI) => {
    const newUserData = params.profileUser.listFriend.map((user: any) => {
      if (user.numberPhone === params.numberPhone) {
        return {...user, status: 3};
      }
      return user;
    });
    try {
      await firestore().collection('Users').doc(params.UserId).update({
        listFriend: newUserData,
      });
    } catch (err) {
      console.log(err);
    }
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
