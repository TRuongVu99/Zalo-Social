import firestore from '@react-native-firebase/firestore';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {endLoading, startLoading} from '../app/appSlice';

interface IFriend {
  listImages?: any;

  statusContents?: {
    media?: any;
    textContent?: string;
    dayOfPostStatus?: {
      day: string;
      hour: string;
    };
    id?: any;
  };
  dataContents?: any;
  AllStatus?: any;
  dataComments?: any;
}

const initialState: IFriend = {
  listImages: [],
  statusContents: {},
  dataContents: {
    listStatusContents: [],
  },
  AllStatus: [],
  dataComments: [],
};

export const getStatus = createAsyncThunk(
  'contents/getStatus',
  async (params: any) => {
    // Filter results
    const data = await firestore()
      .collection('Status')
      .doc(params.numberPhone)
      .get()
      .then(querySnapshot => querySnapshot.data())
      .catch(_err => {
        console.log('Get Thất bại');
      });

    return data;
  },
);
export const getAllStatus = createAsyncThunk(
  'contents/getAllStatus',

  async (params: any) => {
    // const dispatch = useDispatch<any>();
    const listFriends = params.profileUser?.listFriend;
    const newProfileUser = {
      ...params.profileUser,
      timeStamp: moment().format('L'),
      status: 2,
    };
    delete newProfileUser?.listFriendInvitations;
    delete newProfileUser?.listFriend;
    const data: any = [];
    await firestore()
      .collection('Status')
      .doc(params.profileUser.numberPhone)
      .get()
      .then(querySnapshot =>
        data.push(
          querySnapshot?.data()?.listStatusContents.map((items: any) => {
            return {...items, profile: newProfileUser};
          }),
        ),
      )
      .catch(_err => {
        console.log('Get Thất bại');
      });
    for (let i = 0; i < listFriends.length; ++i) {
      await firestore()
        .collection('Status')
        .doc(listFriends[i].numberPhone)
        .get()
        .then(querySnapshot => {
          const arr = querySnapshot
            .data()
            ?.listStatusContents.map((items: any) => {
              return {...items, profile: listFriends[i]};
            });
          data.push(arr);
        })
        .catch(err => console.log({err}));
    }

    return data.flat(Infinity);
  },
);

interface ICreateContent {
  numberPhone: string | undefined;
  contents: any;
  likeStatus?: boolean;
  profile?: any;
  newLikes?: any;
  dataContents?: any;
  newComment?: any;
  profileUser?: {
    username?: string | undefined;
    numberPhone?: string | undefined;
    uid?: string | undefined;
    listFriend?: any;
    UserId?: string | undefined;
    avatar?: string | undefined;
    listFriendInvitations?: any;
    timeStamp?: string | undefined;
    background?: string | undefined;
  };
}
export const updateContent = createAsyncThunk(
  'contents/updateContent',
  async (params: ICreateContent, thunkAPI) => {
    thunkAPI.dispatch(startLoading());
    firestore()
      .collection('Status')
      .doc(params.numberPhone)
      .update({
        listStatusContents: firestore.FieldValue.arrayUnion(params.contents),
      })
      .then(() => {
        thunkAPI.dispatch(endLoading());

        console.log('Đăng bài thành công');
      })
      .catch(err => {
        console.log(err);
        console.log('Đăng bài thất bại');
      });
  },
);

export const likeStatus = createAsyncThunk(
  'contents/likeStatus',
  async (params: ICreateContent, thunkAPI) => {
    const content = params?.contents;
    const newContent = params?.dataContents?.listStatusContents?.map(
      (item: any) => {
        if (item.id === content.id) {
          return {...item, likes: params.newLikes};
        }
        return item;
      },
    );

    firestore()
      .collection('Status')
      .doc(params.numberPhone)
      .set({
        listStatusContents: newContent,
      })
      .then(() => {
        params.likeStatus
          ? console.log('Like status')
          : console.log('Unlike status');
        thunkAPI.dispatch(getAllStatus({profileUser: params.profileUser}));
      })
      .catch(err => {
        console.log('Like status thất bại');
        console.log(err);
      });
  },
);
export const sentComment = createAsyncThunk(
  'contents/sentComment',
  async (params: ICreateContent) => {
    const contents = params?.contents;
    const newContents = params?.dataContents?.listStatusContents?.map(
      (item: any) => {
        if (JSON.stringify(item) === JSON.stringify(contents)) {
          return {...item, comments: params.newComment};
        }
        return item;
      },
    );
    firestore()
      .collection('Status')
      .doc(params.numberPhone)
      .set({
        listStatusContents: newContents,
      })
      .then(() => {
        console.log('oke');
      })
      .catch(err => {
        console.log('that bai');
        console.log({err});
      });
  },
);
export const deleteStatus = createAsyncThunk(
  'contents/deleteStatus',
  async (params: ICreateContent, {dispatch}) => {
    firestore()
      .collection('Status')
      .doc(params.numberPhone)
      .update({
        listStatusContents: firestore.FieldValue.arrayRemove(params.contents),
      })
      .then(() => {
        console.log('Delete status thành công');
        dispatch(
          getStatus({
            numberPhone: params.numberPhone,
          }),
        );
      })
      .catch(err => {
        console.log('Delete status thất bại');
        console.log(err);
      });
  },
);

export const counterSlice = createSlice({
  name: 'listImages',
  initialState,
  reducers: {
    addImagetoList: (state, action) => {
      state.listImages = state.listImages.concat(action.payload);
    },
    resetListImages: state => {
      state.listImages = [];
    },
    resetStatus: state => {
      state.dataContents = [];
      state.AllStatus = [];
    },
    removeImageInList: (state, action) => {
      state.listImages.splice(action.payload, 1);
    },
    createContent: (state, action) => {
      state.statusContents = action.payload;
    },
    getNewAllStatus: (state, action) => {
      state.AllStatus.concat(action.payload);
    },
    updateComment: (state, action) => {
      state.dataComments = action.payload;
    },
    setLikePost: (state, action) => {
      const {isLike, data, uid, newProfileUser, type} = action.payload;
      const arr =
        type === 'newFeed'
          ? state.AllStatus
          : state.dataContents.listStatusContents;
      if (isLike) {
        const arrLike = data?.likes?.filter(
          (item: any, indexs: number) => item.uid !== uid,
        );
        const mapArray = arr.map((item: any) => {
          if (
            item.dayOfPostStatus?.hour === data?.dayOfPostStatus?.hour &&
            item.dayOfPostStatus?.day === data?.dayOfPostStatus?.day
          ) {
            item.likes = arrLike;
          }
          return item;
        });
        state.dataContents = {
          ...state.dataContents,
          listStatusContents: mapArray,
        };
      } else {
        let newLikes = [...data?.likes];
        newLikes.push(newProfileUser);
        arr.map((item: any) => {
          if (
            item.dayOfPostStatus?.hour === data?.dayOfPostStatus?.hour &&
            item.dayOfPostStatus?.day === data?.dayOfPostStatus?.day
          ) {
            item.likes = newLikes;
          }
          return item;
        });
      }
    },
  },
  extraReducers(builder) {
    //fulfilled
    builder.addCase(getStatus.fulfilled, (state: any, action) => {
      state.dataContents = action.payload;
    });
    builder.addCase(getAllStatus.fulfilled, (state: any, action) => {
      state.AllStatus = action.payload;
    });
    //rejected
    builder.addCase(likeStatus.rejected, err => {
      console.log(err);
    });
  },
});
export const {
  addImagetoList,
  removeImageInList,
  resetListImages,
  createContent,
  setLikePost,
  getNewAllStatus,
  resetStatus,
  updateComment,
} = counterSlice.actions;

export default counterSlice.reducer;
function alert(arg0: string) {
  throw new Error('Function not implemented.');
}
