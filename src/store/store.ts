import { configureStore } from '@reduxjs/toolkit';
import DashboardSlice from "../features/Dashboard/Reducer/DashboardSlice"

const store = configureStore({
    reducer: {
        DashboardSlice:DashboardSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;