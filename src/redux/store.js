import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import nomineesReducer from "./nominees/nomineesSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    nominees: nomineesReducer,
  },
});

export default store;
