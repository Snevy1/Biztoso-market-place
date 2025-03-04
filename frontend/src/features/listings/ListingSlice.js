
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listings: [],
};

const listingsSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    setListings: (state, action) => {
      state.listings = action.payload;
    },
    addListing: (state, action) => {
      state.listings.push(action.payload);
    },
    updateListing: (state, action) => {
      const index = state.listings.findIndex((l) => l.id === action.payload.id);
      if (index >= 0) state.listings[index] = action.payload;
    },
    deleteListing: (state, action) => {
      state.listings = state.listings.filter((l) => l.id !== action.payload);
    },
  },
});

export const { setListings, addListing, updateListing, deleteListing } = listingsSlice.actions;
export default listingsSlice.reducer;
