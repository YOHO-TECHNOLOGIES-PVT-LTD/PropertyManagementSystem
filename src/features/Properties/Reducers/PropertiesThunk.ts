import { createProperty, createUnit, deleteProperty, editProperty, getAllProperties } from "../Services/index"
import { setProperty, setLoading, setError, addProperty, updateProperty, removeProperty, addUnit } from "./PropertiesSlice"

//Get All Property
export const fetchGetProperties = (params?: any) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true))
    const res = await getAllProperties(params)
    dispatch(setProperty(res?.data))
  } catch (error) {
    console.log("Error fetching properties:", error)
    dispatch(setError("Failed to fetch properties"))
  }
}

// CREATE Property
export const fetchCreateProperty = (data: any) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true))
    const res = await createProperty(data)
    dispatch(addProperty(res?.data))
  } catch (error) {
    console.log("Error creating property:", error)
    dispatch(setError("Failed to create property"))
  }
}

// EDIT Property
export const fetchEditProperty =
  (params: any, updatedData: any) => async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      const res = await editProperty(params, updatedData); 
      dispatch(updateProperty(res)); 
    } catch (error) {
      console.log("Error editing property:", error);
      dispatch(setError("Failed to edit property"));
    }
  };

//Delete Property
export const fetchDeleteProperty = (uuid: any) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    await deleteProperty({uuid}); 
    dispatch(removeProperty(uuid)); 
  } catch (error) {
    console.log("Error deleting property:", error);
    dispatch(setError("Failed to delete property"));
  }
};

//Create Unit 
export const fetchCreateUnit = (data: any) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const res = await createUnit(data);
    dispatch(addUnit(res?.data));
  } catch (error) {
    console.log("Error creating unit:", error);
    dispatch(setError("Failed to create unit"));
  }
};