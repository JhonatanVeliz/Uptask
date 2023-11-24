import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const macroTasks = createSlice({
    name : 'projects',
    initialState,
    reducers: {
        createMacroTasksState : (state, actions) => {
            return [...actions.payload];
        },
        createMacroTask : (state, actions) => {
            state.push(actions.payload);
        },
        deleteMacroTask : ( state, actions ) => {
            const macroTaskId = actions.payload;
            const indexToDelete = state.findIndex(item => item.id === macroTaskId);

            if (indexToDelete !== -1) { state.splice(indexToDelete, 1) }
        }
    }
})

export const { createMacroTasksState, createMacroTask, deleteMacroTask } = macroTasks.actions;
export default macroTasks.reducer;