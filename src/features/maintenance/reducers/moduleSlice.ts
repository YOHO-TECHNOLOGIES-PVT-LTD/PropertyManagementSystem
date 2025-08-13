import { createSlice } from "@reduxjs/toolkit";

const ModuleSlice = createSlice({
  name: "Maintenance",
  initialState: {
    maintenancedata: [],
    
  },
  reducers: {
    getAllMaintenance: (state, action) => {
      state.maintenancedata = action.payload;
    },
     creatMaintenance: (state, action) => {
      state.maintenancedata = action.payload;
    },

  },
});
export const {
  getAllMaintenance,creatMaintenance

} = ModuleSlice.actions;
export default ModuleSlice.reducer;
