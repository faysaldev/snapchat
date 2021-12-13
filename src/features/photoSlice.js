import { createSlice } from '@reduxjs/toolkit';

export const photoSlice = createSlice({
  name: 'img',
  initialState:{
    image: null,
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setImg: (state,action) => {
      state.image = action.payload;
      },
     resetImg: (state) => {
      state.image = null;
      },
  },
});

export const { setImg,resetImg } = photoSlice.actions;

export const selectImage = (state) => state.img.image;



export default photoSlice.reducer;
