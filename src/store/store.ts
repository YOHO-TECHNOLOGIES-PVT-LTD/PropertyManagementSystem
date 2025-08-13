import { configureStore } from '@reduxjs/toolkit';
import SettingsProfileSlice from "../features/settings/reducers/slice"

const store = configureStore({
    reducer: {
        SettingsProfileSlice:SettingsProfileSlice

    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;