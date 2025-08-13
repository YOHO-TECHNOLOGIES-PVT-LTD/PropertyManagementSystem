import { configureStore } from "@reduxjs/toolkit";
import DashboardSlice from "../features/Dashboard/Reducer/DashboardSlice";
import NotificationReducer from '../../src/features/notification/redecures/slice'
import TenantSlice from '../features/tenants/reducers/TenantSlice';
import rentReducer from '../features/Rent/slice'
import propertyReducer from "../features/Properties/Reducers/PropertiesSlice"
import Maintenance from "../features/maintenance/reducers/moduleSlice"
import Property from "../features/maintenance/reducers/moduleSlice"

const store = configureStore({
  reducer: {
    DashboardSlice: DashboardSlice,
    NotificationReducer: NotificationReducer,
    TenantSlice: TenantSlice,
    property: propertyReducer,
    rentReducer: rentReducer,
    Maintenance: Maintenance,
    Property: Property
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
