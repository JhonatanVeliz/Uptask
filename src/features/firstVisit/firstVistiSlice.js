import { createSlice } from "@reduxjs/toolkit";

// este slice consiste en que si el usuario hace otra visita o presta el dispositivo para que otro usuario inicie sesion pero en ningun momento se cierra o se reacarga la pagina entonces esto permite que no se llame la funcion automaticamente con el suarion que se encuentra en localStorage.

const initialState = { value: true };

const firstVisitSlice = createSlice({
    name : 'fisrtVisit',
    initialState,
    reducers: {
        modifyState : (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { modifyState } = firstVisitSlice.actions;
export default firstVisitSlice.reducer;