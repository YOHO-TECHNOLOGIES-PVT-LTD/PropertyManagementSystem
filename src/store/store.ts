import { configureStore } from "@reduxjs/toolkit";
import DashboardSlice from "../features/Dashboard/Reducer/DashboardSlice";
import NotificationReducer from '../../src/features/notification/redecures/slice'
import TenantSlice from '../features/tenants/reducers/TenantSlice';


const store = configureStore({
  reducer: {
    DashboardSlice: DashboardSlice,
    NotificationReducer: NotificationReducer,
    TenantSlice: TenantSlice
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
