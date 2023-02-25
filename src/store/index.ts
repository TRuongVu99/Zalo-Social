import {configureStore} from '@reduxjs/toolkit';
import {user} from './slice/user';
import {friends} from './slice/friends';
import {app} from './slice/app';
import {message} from './slice/message';
import {contents} from './slice/contents';
import {profileFriend} from './slice/profileFriend';
import logger from 'redux-logger';

export const store = configureStore({
  reducer: {
    user,
    friends,
    profileFriend,
    contents,
    message,
    app,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
