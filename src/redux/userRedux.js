import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState:{
        currentUser: null,
        isFetching: false,
        error: false,
        initialPopUpShown: 0
    },
    reducers: {
        loginStart:(state)=>{
            state.isFetching = true;
        },
        loginSuccess:(state, action)=>{
            state.isFetching = false;
            state.currentUser = action.payload
        },
        loginFailure:(state)=>{
            state.isFetching = false;
            state.error = true;
        },
        logout:(state)=>{
            state.isFetching = false;
            state.error = false;
            state.currentUser = null
        },
        showPopUp:(state)=>{
            state.initialPopUpShown += 1;
        },
    },
});

export const { loginStart, loginFailure, loginSuccess, logout, showPopUp } = userSlice.actions;
export default userSlice.reducer;