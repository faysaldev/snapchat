import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState:{
    user: null,
    selectImage:null,
  },
  reducers: {
    login: (state,action) => {
      state.user = action.payload;
    },
     logout: (state) => {
      state.user = null;
    },
      selectedImg: (state,action) => {
      state.selectImage = action.payload;
    },
      resetImg: (state) => {
      state.selectImage = null;
    },
  },
});

export const { login,logout,selectedImg,resetImg } = appSlice.actions;

export const selectedUser = (state) => state.app.user;
export const selectedImage = (state) => state.app.selectImage;



export default appSlice.reducer;
