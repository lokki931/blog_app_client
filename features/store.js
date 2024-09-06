import { combineReducers, configureStore } from '@reduxjs/toolkit';
import postSlice from './posts/postSlice';
import userSlice from './users/userSlice';

const rootReducer = combineReducers({
  posts: postSlice,
  users: userSlice,
  //add all your reducers here
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
