import { createSlice } from "@reduxjs/toolkit";

const initialState = { userData : { name: '', email : '', password : '', id : '', isRegistered : false} };

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        changeUserState : ( state, action ) => {
            state.userData = action.payload;
        }
    }
})

export const { changeUserState } = userSlice.actions;
export default userSlice.reducer;