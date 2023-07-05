import {createAsyncThunk} from "@reduxjs/toolkit";
import MovementService from "@service/movementsService";
import {MovementState} from "@context/redux/movements/movementsSlice";
import logging from "@utils/logging";

export const getMovementsThunk = createAsyncThunk(
    "movements/getMovements",
    async (userId: string, {rejectWithValue}) => {
        try {
            return await MovementService.getMovements(userId);
        } catch (err) {
            logging.error(`Got error while getting movements: ${err.message || err}`);
            return rejectWithValue(err);
        }
    },
    {
        condition: (userId, {getState}) => {
            const movementReducer = getState() as MovementState;
            if (movementReducer.isAsync) {
                // Already fetched or in progress, don't need to re-fetch
                return false;
            }
        },
    }
);

export const deleteMovementThunk = createAsyncThunk(
    "movements/deleteMovement",
    async (movementId: string, {rejectWithValue}) => {
        try {
            await MovementService.deleteMovement(movementId);
            return movementId;
        } catch (err) {
            logging.error(
                `Got error while deleting movement ${movementId}: ${err.message || err}`
            );
            return rejectWithValue(err);
        }
    }
);
