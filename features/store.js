import { combineReducers, configureStore } from '@reduxjs/toolkit';
import postSlice from './posts/postSlice';
import userSlice from './users/userSlice';
import categorySlice from './categories/categorySlice';
import tagSlice from './tags/tagSlice';
import commentSlice from './сomments/commentSlice';

const rootReducer = combineReducers({
  posts: postSlice,
  users: userSlice,
  categories: categorySlice,
  tags: tagSlice,
  comments: commentSlice,
  //add all your reducers here
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
