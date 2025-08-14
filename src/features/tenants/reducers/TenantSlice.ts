import { createSlice } from '@reduxjs/toolkit';

const TenantSlice = createSlice({
    name: 'tenantSlice',
    initialState: {
        data: [],
        singleData: [],
    },
    reducers: {
        getAllTenantDetails: (state, action) => {
            state.data = action.payload;
        },
        getsingleTenantDetails: (state, action) => {
            state.singleData = action.payload;
        },
    },
});

export const {getAllTenantDetails,getsingleTenantDetails } = TenantSlice.actions
export default TenantSlice.reducer