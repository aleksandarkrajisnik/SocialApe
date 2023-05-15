import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import screamReducer from "./screamSlice";

export const store = configureStore({
  reducer: {
    userReducer,
    screamReducer,
  },
});
