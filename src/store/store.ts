import { configureStore } from '@reduxjs/toolkit';
import Maintenance from "../features/maintenance/reducers/moduleSlice"
import Property from "../features/maintenance/reducers/moduleSlice"

const store = configureStore({
    reducer: {
        Maintenance:Maintenance,
        Property:Property

    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;