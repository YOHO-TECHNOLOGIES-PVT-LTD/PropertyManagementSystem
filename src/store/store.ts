import { configureStore } from '@reduxjs/toolkit';
import TenantSlice from '../features/tenants/reducers/TenantSlice';

const store = configureStore({
    reducer: {
        TenantSlice : TenantSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;