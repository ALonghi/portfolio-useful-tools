import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {RootState} from "context/redux/rootReducer";

export interface UserState {
    userId?: string;
    isAuthenticated: boolean;
    isAsync: boolean;
}

export const initialState: UserState = {
    userId: null,
    isAuthenticated: false,
    isAsync: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserStateAsync: (
            state,
            {payload: asyncStatus}: PayloadAction<boolean>
        ) => {
            state.isAsync = asyncStatus;
        },
        saveAuthUser: (
            state,
            {payload: {userId}}: PayloadAction<{ userId: string }>
        ) => {
            state.userId = userId;
            state.isAuthenticated = !!userId;
        },
        revokeAuthentication: (state) => {
            state.userId = null;
            state.isAuthenticated = false;
            state.isAsync = false;
        },
    },
});

export const {setUserStateAsync, saveAuthUser, revokeAuthentication} =
    userSlice.actions;
export const userReducer = userSlice.reducer;

export const userStateSelector = (state: RootState): UserState =>
    state.userReducer;
export const userIdSelector = (state: RootState): string | null =>
    state.userReducer?.userId;
export const userIsAuthSelector = (state: RootState): boolean =>
    state.userReducer?.isAuthenticated;
export const userIsAsyncSelector = (state: RootState): boolean =>
    state.userReducer?.isAsync;
