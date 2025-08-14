import { getAllTenants, getTenantsById } from "../services";
import { getAllTenantDetails, getsingleTenantDetails } from "./TenantSlice";

export const getAllTenantData =(data: any) => async (dispatch: any) => {
    const response = await getAllTenants(data)
    console.log(response, 'all tenant response');
            dispatch(getAllTenantDetails(response));
}

export const getSingleTenantData =(data: any) => async (dispatch: any) => {
    const response = await getTenantsById(data)
    console.log(response, 'single tenant response');
            dispatch(getsingleTenantDetails(response));
}