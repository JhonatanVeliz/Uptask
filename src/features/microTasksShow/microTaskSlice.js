import { createSlice } from "@reduxjs/toolkit";

const initialState = { taskId : '', microTasks : [] };

const microTaskSlice = createSlice({
    name : 'microTasksList',
    initialState,
    reducers : {
        createState : (state, actions) => {
            return { ...actions.payload }
        },
        deleteMicroTaskState : ( state, actions ) => {
            const microTaskIndex = actions.payload;
            state.microTasks = state.microTasks.filter((_, index) => {
                console.log(index, microTaskIndex);
                return index !== microTaskIndex
            });
        }
    }
});

export const { createState, deleteMicroTaskState } = microTaskSlice.actions;
export default microTaskSlice.reducer;