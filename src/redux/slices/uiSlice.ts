import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  units: string;
}

const initialState: UIState = {
  units: "metric",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleUnits: (state) => {
      state.units = state.units === "metric" ? "standard" : "metric";
    },
  },
});

export const { toggleUnits } = uiSlice.actions;
export default uiSlice.reducer;
