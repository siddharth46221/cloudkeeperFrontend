import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./UserDataSlice"
import accountSlice from "./AccountSelectSlice"

export const Store= configureStore({
    reducer:{
        UserData: userSlice,
        Accounts: accountSlice,
    },

});