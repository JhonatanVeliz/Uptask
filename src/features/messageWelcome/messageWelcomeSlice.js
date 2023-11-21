import { createSlice } from "@reduxjs/toolkit";

const initialState = { isShow : true };

const messageWelcomeSlice = createSlice({
    name: 'isShowMessageWelcome',
    initialState,
    reducers: {
        changeMessageStatus : ( state, action ) => {
            state.isShow = action.payload;
        }
    }
})

export const { changeMessageStatus } = messageWelcomeSlice.actions;
export default messageWelcomeSlice.reducer;