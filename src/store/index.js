/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from "@reduxjs/toolkit";
import articleFormReducer from "./articleFormSlice";
import articleListReducer from './articleListSlice'
import userReducer from './userSlice'

export const store = configureStore({
  reducer: {
    articleList: articleListReducer,
    articleForm: articleFormReducer,
    user: userReducer
  },
});
