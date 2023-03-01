import firestore from '@react-native-firebase/firestore';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
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
  };
  dataContents?: any;
}

const initialState: IFriend = {
  listImages: [],
  statusContents: {},
  dataContents: {
    listStatusContents: [],
  },
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

interface ICreateContent {
  numberPhone: string | undefined;
  contents: any;
  likeStatus?: boolean;
  profile?: any;
  newLikes?: any;
  dataContents?: any;
  newComment?: any;
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
  async (params: ICreateContent) => {
    const content = params?.contents;
    const newContent = params?.dataContents?.listStatusContents?.map(
      (item: any) => {
        if (JSON.stringify(item) === JSON.stringify(content)) {
          return {...item, likes: params.newLikes};
        }
        return item;
      },
    );
    firestore()
      .collection('Status')
      .doc(params.numberPhone)
      .update({
        listStatusContents: newContent,
      })
      .then(() => {
        params.likeStatus
          ? console.log('Like status')
          : console.log('Unlike status');
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
    const content = params?.contents;
    const newContent = params?.dataContents?.listStatusContents?.map(
      (item: any) => {
        if (JSON.stringify(item) === JSON.stringify(content)) {
          return {...item, comments: params.newComment};
        }
        return item;
      },
    );
    firestore()
      .collection('Status')
      .doc(params.numberPhone)
      .update({
        listStatusContents: newContent,
      })
      .then(() => {
        console.log('Comment thành công');
      })
      .catch(err => {
        console.log('Comment thất bại');
        console.log(err);
      });
  },
);
export const deleteStatus = createAsyncThunk(
  'contents/deleteStatus',
  async (params: ICreateContent) => {
    firestore()
      .collection('Status')
      .doc(params.numberPhone)
      .update({
        listStatusContents: firestore.FieldValue.arrayRemove(params.contents),
      })
      .then(() => {
        console.log('Delete status thành công');
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
    removeImageInList: (state, action) => {
      state.listImages.splice(action.payload, 1);
    },
    createContent: (state, action) => {
      state.statusContents = action.payload;
    },
    deletePost: (state, action) => {
      state.dataContents.listStatusContents.splice(action.payload, 1);
    },
    setLikePost: (state, action) => {
      const {isLike, data, uid, newProfileUser} = action.payload;
      if (isLike) {
        const arrLike = data?.likes?.filter(
          (item: any, indexs: number) => item.uid !== uid,
        );
        const mapArray = state.dataContents.listStatusContents.map(
          (item: any) => {
            if (
              item.dayOfPostStatus?.hour === data?.dayOfPostStatus?.hour &&
              item.dayOfPostStatus?.day === data?.dayOfPostStatus?.day
            ) {
              item.likes = arrLike;
            }
            return item;
          },
        );
        state.dataContents = {
          ...state.dataContents,
          listStatusContents: mapArray,
        };
      } else {
        let newLikes = [...data?.likes];
        newLikes.push(newProfileUser);
        state.dataContents.listStatusContents.map((item: any) => {
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
  deletePost,
} = counterSlice.actions;

export default counterSlice.reducer;
function alert(arg0: string) {
  throw new Error('Function not implemented.');
}
