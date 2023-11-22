import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/login/loginSlice";
import projectsReducer from "../features/projects/projectsSlice";
import firstVisitReducer from "../features/firstVisit/firstVistiSlice"; 
import messageWelcomeReducer from "../features/messageWelcome/messageWelcomeSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
    reducer: {
        login : loginReducer,
        projects : projectsReducer,
        firstVisit: firstVisitReducer,
        isShowMessageWelcome : messageWelcomeReducer,
        user : userReducer
    }
})