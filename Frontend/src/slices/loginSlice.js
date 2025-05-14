import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name:"login",
    initialState:{
        isLogin:false
    },
    reducers:{
        toggleLogin:(state,action)=>{
            state.isLogin = !state.isLogin
        }
    }
})
export const {toggleLogin} = loginSlice.actions;

export default loginSlice.reducer;