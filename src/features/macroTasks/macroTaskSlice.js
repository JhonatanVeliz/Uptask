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
            state.push({ habit : actions.payload, trackers : [] });
        },
        updateMacroTask : ( state, actions ) => {
            const macroTask = actions.payload;
            const indexToDelete = state.findIndex(item => item.habit.id == macroTask.id);

            if (indexToDelete !== -1) { state[indexToDelete].habit = macroTask };
        },
        deleteMacroTask : ( state, actions ) => {
            const macroTaskId = actions.payload;
            const indexToDelete = state.findIndex(item => item.habit.id == macroTaskId);

            if (indexToDelete !== -1) { state.splice(state[indexToDelete]) };
        }
    }
})

export const { createMacroTasksState, createMacroTask, updateMacroTask, deleteMacroTask } = macroTasks.actions;
export default macroTasks.reducer;