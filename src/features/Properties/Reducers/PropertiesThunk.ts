import { createProperty, editProperty, getAllProperties } from "../Services/index"
import { setProperty, setLoading, setError, addProperty, updateProperty } from "./PropertiesSlice"

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
export const fetchEditProperty = (uuid: string, data: any) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true))
    const res = await editProperty(uuid, data)
    dispatch(updateProperty(res?.data))
  } catch (error) {
    console.log("Error editing property:", error)
    dispatch(setError("Failed to edit property"))
  }
}