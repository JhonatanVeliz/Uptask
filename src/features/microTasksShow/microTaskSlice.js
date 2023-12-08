import { createSlice } from "@reduxjs/toolkit";

const initialState = { taskId : '', microTasks : [] };

const microTaskSlice = createSlice({
    name : 'microTasksList',
    initialState,
    reducers : {
        createState : (state, actions) => {
            return { ...actions.payload }
        }
    }
});

export const { createState } = microTaskSlice.actions;
export default microTaskSlice.reducer;