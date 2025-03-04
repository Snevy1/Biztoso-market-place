// src/redux/profileSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null, 
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    clearProfile: (state) => {
      state.profile = null;
    },
  },
});

export const selectProfile = (state)=> state.profile.profile;
export const { setProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
