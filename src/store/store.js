import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./authoSlice"

const store = configureStore({
    reducer: {
        auth :authSliceReducer
    }
})

export default store;
