import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/login/loginSlice";
import macroTasksReducer from "../features/macroTasks/macroTaskSlice";
import firstVisitReducer from "../features/firstVisit/firstVistiSlice"; 
import messageWelcomeReducer from "../features/messageWelcome/messageWelcomeSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
    reducer: {
        login : loginReducer,
        macroTasks : macroTasksReducer,
        firstVisit: firstVisitReducer,
        isShowMessageWelcome : messageWelcomeReducer,
        user : userReducer
    }
})