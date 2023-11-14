import { createSlice } from "@reduxjs/toolkit";

const initialState = { token : '' };

export const loginSlice = createSlice({
    name : 'login',
    initialState,

    reducers : {
        login : (state, actions) => {
            state.token = actions.payload;
            console.log(state.token);
        },
        logout : (state) => {
            state.token = '';
        }
    }
})

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;