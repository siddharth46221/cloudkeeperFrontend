import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
    name: "Account",
    initialState:{
        value: []
    },

    reducers:{
        accountChange(state,action){
            state.value=action.payload;
        },
    },
});

export const {accountChange}= accountSlice.actions;
export default accountSlice.reducer;