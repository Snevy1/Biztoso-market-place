
import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../features/profiles/ProfileSlice"
import chatReducer from "../features/chats/ChatSlice"
import listingsReducer from "../features/listings/ListingSlice"
import leadsReducer from "../features/leads/LeadsSlice"

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    chat: chatReducer,
    listings: listingsReducer,
    leads: leadsReducer,
  },
});

