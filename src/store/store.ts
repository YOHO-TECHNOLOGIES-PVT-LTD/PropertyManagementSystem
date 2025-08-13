import { configureStore } from '@reduxjs/toolkit';
import rentReducer from '../features/Rent/slice'

const store = configureStore({
    reducer: {
        rentReducer: rentReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;