
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  leads: [],
};

const leadsSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {
    setLeads: (state, action) => {
      state.leads = action.payload;
    },
    claimLead: (state, action) => {
      const index = state.leads.findIndex((lead) => lead.id === action.payload);
      if (index >= 0) state.leads[index].status = "claimed";
    },
  },
});

export const { setLeads, claimLead } = leadsSlice.actions;
export default leadsSlice.reducer;
