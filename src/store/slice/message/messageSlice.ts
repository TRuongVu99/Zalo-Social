import firestore from '@react-native-firebase/firestore';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {useEffect} from 'react';
import {message} from '.';

// export const likeStatus = createAsyncThunk(
//   'message/likeStatus',
//   async (params: ICreateContent) => {
//     const content = params?.contents;
//     const newContent = params?.dataContents?.listStatusContents?.map(
//       (item: any) => {
//         if (JSON.stringify(item) === JSON.stringify(content)) {
//           return {...item, likes: params.newLikes};
//         }
//         return item;
//       },
//     );
//     firestore()
//       .collection('Status')
//       .doc(params.numberPhone)
//       .update({
//         listStatusContents: newContent,
//       })
//       .then(() => {
//         params.likeStatus
//           ? console.log('Like status')
//           : console.log('Unlike status');
//       })
//       .catch(err => {
//         console.log('Like status thất bại');
//         console.log(err);
//       });
//   },
// );
// export const deleteStatus = createAsyncThunk(
//   'message/deleteStatus',
//   async (params: ICreateContent) => {
//     firestore()
//       .collection('Status')
//       .doc(params.numberPhone)
//       .update({
//         listStatusContents: firestore.FieldValue.arrayRemove(params.contents),
//       })
//       .then(() => {
//         console.log('Delete status thành công');
//       })
//       .catch(err => {
//         console.log('Delete status thất bại');
//         console.log(err);
//       });
//   },
// );
interface IMessage {
  Messages: {
    isSender?: boolean;
    isReceive?: boolean;
    message?: any;
    timeSent?: number;
    image?: string;
  };
  MessageAll: any;
}
export const getMessage = createAsyncThunk(
  'message/getMessage',
  async (params: any) => {
    const data = await firestore()
      .collection('Message')
      .doc(params.numberPhone)
      .get()
      .then(querySnapshot => querySnapshot.data())
      .catch(_err => {
        console.log('Get Thất bại');
      });

    return data;
  },
);

interface ICreateContent {
  numberPhone: string | undefined;
  message: any;
  likeStatus?: boolean;
  profile?: any;
  newLikes?: any;
  dataContents?: any;
}
export const sentMessage = createAsyncThunk(
  'message/SentMessage',
  async (params: ICreateContent, thunkAPI) => {
    const arr = params.numberPhone;
    firestore()
      .collection('Message')
      .doc(params.numberPhone)
      .update({message: firestore.FieldValue.arrayUnion(params.message)})
      .then(() => {
        console.log('Gửi tin nhắn thành công');
      })
      .catch(err => {
        console.log(err);
        console.log('Gửi tin nhắn thất bại');
      });
  },
);
const initialState: IMessage = {
  Messages: {},
  MessageAll: [],
};
export const counterSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    getMessages: (state, action) => {
      state.Messages = action.payload;
    },
    getMessageAll: (state, action) => {
      state.MessageAll = action.payload;
    },
    resetMessage: state => {
      state.Messages = {};
      state.MessageAll = [];
    },
  },
  extraReducers(builder) {
    //fulfilled
    builder.addCase(getMessage.fulfilled, (state: any, action) => {
      state.Messages = action.payload;
    });
  },
});
export const {getMessages, getMessageAll, resetMessage} = counterSlice.actions;

export default counterSlice.reducer;
