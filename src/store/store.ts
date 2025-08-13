import { configureStore } from "@reduxjs/toolkit";
import DashboardSlice from "../features/Dashboard/Reducer/DashboardSlice";
import propertyReducer from "../features/Properties/Reducers/PropertiesSlice"

const store = configureStore({
  reducer: {
    DashboardSlice: DashboardSlice,
    property: propertyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
