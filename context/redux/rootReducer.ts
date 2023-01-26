import {combineReducers} from '@reduxjs/toolkit'
import {uiReducer} from "@context/redux/UI/UISlice";
import {userReducer} from "@context/redux/user/userSlice";

const rootReducer = combineReducers({
    uiReducer: uiReducer,
    userReducer
})

export type RootState = ReturnType<any>

export default rootReducer