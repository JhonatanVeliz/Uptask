import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/login/loginSlice";
import projectsReducer from "../features/projects/projectsSlice";

export const store = configureStore({
    reducer: {
        login : loginReducer,
        projects : projectsReducer
    },
})