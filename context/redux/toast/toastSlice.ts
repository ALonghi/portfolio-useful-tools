import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {RootState} from '@context/redux/rootReducer'

export type ToastType = `success` | `info` | `error`

export interface ToastData {
    id: string,
    details: string,
    type: ToastType,
    hidden: boolean,
    duration?: number,
}

export interface ToastState {
    events: ToastData[]
}

export const initialState: ToastState = {
    events: []
}


export const createNotification = (dispatch, notification: ToastData) => {
    dispatch(addNotificationEvent(notification))
    setTimeout(() => {
        deleteNotification(dispatch, notification.id)
    }, notification.duration
        ? notification.duration
        : notification.type === `success` ? 3000 : 5000)
}

export const deleteNotification = (dispatch, notificationId: string) => {
    dispatch(hideNotificationById(notificationId))
    setTimeout(() => {
        dispatch(clearNotificationEventById(notificationId))
    }, 1000)
}

export const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        addNotificationEvent: (state, {payload: newEvent}: PayloadAction<ToastData>) => {
            state.events.push(newEvent)
        },
        hideNotificationById: (state, {payload: eventId}: PayloadAction<string>) => {
            state.events = state.events.map(e => e.id === eventId
                ? {...e, hidden: true}
                : e
            )
        },
        clearNotificationEventById: (state, {payload: eventId}: PayloadAction<string>) => {
            state.events = state.events.filter(e => e.id != eventId)
        },
    },
})


export const {
    addNotificationEvent,
    clearNotificationEventById,
    hideNotificationById
} = toastSlice.actions
export const toastReducer = toastSlice.reducer

export const eventsSelector = (state: RootState) => state.toastReducer?.events
export const lastEventSelector = (state: RootState) => state.toastReducer?.events[state.toastReducer?.events?.length - 1]
