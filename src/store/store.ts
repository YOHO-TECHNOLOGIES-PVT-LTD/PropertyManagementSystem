import { configureStore } from "@reduxjs/toolkit";
import DashboardSlice from "../features/Dashboard/Reducer/DashboardSlice";
import NotificationReducer from '../../src/features/notification/redecures/slice'


const store = configureStore({
  reducer: {
    DashboardSlice: DashboardSlice,
    NotificationReducer: NotificationReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
