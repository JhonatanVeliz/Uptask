import { createSlice } from "@reduxjs/toolkit";

const initialState = { user : 'user' };

export const loginSlice = createSlice({
    name : 'login',
    initialState,

    reducers : {
        login : (state, actions) => {
            state.user = actions.payload;
        }
    }
})

export const { login } = loginSlice.actions;
export default loginSlice.reducer;