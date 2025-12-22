import { createSlice } from "@reduxjs/toolkit";


function getUserDetail(){
    const userData= localStorage.getItem("user");
    console.log("userDatdda", userData);
    return  userData ? JSON.parse(userData) : {};
}
const userSlice = createSlice({
    name: "UserData",
    initialState:{
        value: getUserDetail()
    },

    reducers:{
        userChange(state,action){
            console.log("the action is dddddthis",action.payload);
            state.value=action.payload;
        },
    },
});

export const {userChange}= userSlice.actions;
export default userSlice.reducer;