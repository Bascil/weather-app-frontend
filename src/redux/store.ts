import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "@/redux/slices/weatherSlice";
import uiReducer from "@/redux/slices/uiSlice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
