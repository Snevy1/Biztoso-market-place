
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setMessageHistory: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const { addMessage, setMessageHistory } = chatSlice.actions;
export default chatSlice.reducer;
