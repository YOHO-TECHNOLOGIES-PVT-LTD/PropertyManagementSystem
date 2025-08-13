import { configureStore } from '@reduxjs/toolkit';
import Maintenance from "../features/maintenance/reducers/moduleSlice"

const store = configureStore({
    reducer: {
        Maintenance:Maintenance

    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;