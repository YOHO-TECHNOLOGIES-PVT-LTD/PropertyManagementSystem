import { configureStore } from '@reduxjs/toolkit';
import landstore from '../features/lands/redux/slice'
const store = configureStore({
    reducer: {
        landstore
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;