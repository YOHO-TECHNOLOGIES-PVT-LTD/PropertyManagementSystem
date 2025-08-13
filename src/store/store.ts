import { configureStore } from '@reduxjs/toolkit';
import NotificationReducer from '../../src/features/notification/redecures/slice'
const store = configureStore({
    reducer: {
    NotificationReducer:NotificationReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;