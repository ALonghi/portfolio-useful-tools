import {combineReducers} from "@reduxjs/toolkit";
import {uiReducer} from "@context/redux/UI/UISlice";
import {userReducer} from "@context/redux/user/userSlice";
import {movementReducer} from "@context/redux/movements/movementsSlice";

const rootReducer = combineReducers({
    uiReducer,
    movementReducer,
    userReducer,
});

export type RootState = ReturnType<any>;

export default rootReducer;
