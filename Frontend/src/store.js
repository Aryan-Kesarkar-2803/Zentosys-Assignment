import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice";
import roleReducer from "./slices/roleSlice"
export const store = configureStore({
    reducer: {
        loginReducer,
        roleReducer
    }
});
