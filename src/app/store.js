import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../features/appSlice';
import photoReducer from '../features/photoSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    img:photoReducer,
  },
});
