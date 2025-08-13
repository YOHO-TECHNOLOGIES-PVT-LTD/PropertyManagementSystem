import { createSlice } from '@reduxjs/toolkit';

const NotificationSlice = createSlice({
    name:'NotificationSlice',
    initialState:{
        notification:[],
    },
    reducers:{
        getNotification:(state,action)=>{
            state.notification=action.payload;
        },
    },
})

export const {getNotification} = NotificationSlice.actions;
export default NotificationSlice.reducer;