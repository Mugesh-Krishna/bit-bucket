import { configureStore } from "@reduxjs/toolkit";
import profileSliceReducer from './UserSlice'


export const store = configureStore({
    reducer:{
        userDetails:profileSliceReducer
    }
})