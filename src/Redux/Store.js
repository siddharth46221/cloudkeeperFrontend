import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./UserDataSlice"

export const Store= configureStore({
    reducer:{
        UserData: userSlice
    },
});