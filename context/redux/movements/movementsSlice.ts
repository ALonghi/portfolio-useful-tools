import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {RootState} from "@context/redux/rootReducer";
import IMovement from "@model/income/IMovement";
import {deleteMovementThunk, getMovementsThunk,} from "@context/redux/movements/movementThunk";

export interface MovementState {
    movements: IMovement[];
    isAsync: boolean;
}

export const initialState: MovementState = {
    movements: [],
    isAsync: false,
};

export const movementsSlice = createSlice({
    name: "movements",
    initialState,
    reducers: {
        setFetching: (state, {payload: asyncStatus}: PayloadAction<boolean>) => {
            state.isAsync = asyncStatus;
        },
        updateMovements: (
            state,
            {payload: movements}: PayloadAction<IMovement[]>
        ) => {
            state.movements = movements;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getMovementsThunk.pending, (state) => {
            state.isAsync = true;
        }),
            builder.addCase(getMovementsThunk.rejected, (state) => {
                state.isAsync = false;
            }),
            builder.addCase(
                getMovementsThunk.fulfilled,
                (state, {payload: result}) => {
                    state.movements = result;
                    state.isAsync = false;
                }
            ),
            builder.addCase(deleteMovementThunk.pending, (state) => {
                state.isAsync = true;
            }),
            builder.addCase(deleteMovementThunk.rejected, (state) => {
                state.isAsync = false;
            }),
            builder.addCase(
                deleteMovementThunk.fulfilled,
                (state, {payload: movementId}) => {
                    state.movements = state.movements.filter((m) => m.id !== movementId);
                    state.isAsync = false;
                }
            );
    },
});

export const {setFetching, updateMovements} = movementsSlice.actions;
export const movementReducer = movementsSlice.reducer;

export const movementStateSelector = (state: RootState) =>
    state.movementReducer;
export const movementsSelector = (state: RootState) =>
    state.movementReducer?.movements;
export const selectMovement = (state: RootState, movementId: string) => {
    let result = {} as IMovement;
    const movements = state.movementReducer?.movements || [];
    if (movements.length > 0) {
        const foundQueryResult = movements.find((p) => p.id === movementId);
        result = foundQueryResult ? foundQueryResult : result;
    }
    return result;
};
export const movementsIsAsyncSelector = (state: RootState) =>
    state.movementReducer?.isAsync;
export const productsLastVisibleSelector = (state: RootState) =>
    state.movementReducer?.lastVisible;
