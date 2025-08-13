import { configureStore } from '@reduxjs/toolkit';
import LeaseManagementSlice from '../features/Leasemanagement/reducer/LeaseSlice';

const store = configureStore({
    reducer: {
        LeasemanagementSlice:LeaseManagementSlice

    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;