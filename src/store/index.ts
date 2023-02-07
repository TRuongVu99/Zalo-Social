import {configureStore} from '@reduxjs/toolkit';
import {user} from './slice/user';
import {frends} from './slice/frends';
import logger from 'redux-logger';

export const store = configureStore({
  reducer: {
    user,
    frends,
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
