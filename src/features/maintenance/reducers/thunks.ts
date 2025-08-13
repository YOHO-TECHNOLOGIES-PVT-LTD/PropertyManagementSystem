import {AllMaintenance, CreatMaintenance} from "../services/index.ts"
import  {creatMaintenance, getAllMaintenance} from "./moduleSlice.ts" 

export const GetallMaintenanceThunks = (params: any) => async (dispatch: any) => {
  try {
    const response = await AllMaintenance(params);
    dispatch( getAllMaintenance(response.data));
    console.log(response.data, "Maintenance in thunks");
    return response.data
  } catch (error) {
    console.log("error in thunks", error);
  }
};

export const CreatMaintenanceThunks = (params: any) => async (dispatch: any) => {
  try {
    const response = await CreatMaintenance(params);
    dispatch( creatMaintenance(response?.data || response || []));
    console.log(response.data, "Maintenance in thunks");
    return response
  } catch (error) {
    console.log("error in thunks", error);
  }
};


