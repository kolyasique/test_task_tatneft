import { configureStore } from "@reduxjs/toolkit";
import articleFormReducer from "./articleFormSlice";
import articleListReducer from './articleListSlice'

export const store = configureStore({
  reducer: {
    articleList: articleListReducer,
    articleForm: articleFormReducer,
  },
});
