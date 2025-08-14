import Client from "../../../api/index"

export const getAllProperties = async (params?: any) => {
  try {
    const res = await Client.property.getAll(params)
    console.log("data Service:", res)
    return res
  } catch (error) {
    console.log("Error", error)
    throw error
  }
}


export const createProperty = async (data: any) => {
  try {
    const res = await Client.property.create(data)
    console.log("Create Data:",res)
    return res
  } catch (error) {
    console.log("Error",error)
    throw error
  }
}


export const editProperty = async (params: any, data: any) => {
    try {
        const res =await Client.property.edit(params,data)
        console.log("Edit data",res)
        return res
    } catch (error) {
        console.log("Error:",error)
        throw error
    }
}


export const deleteProperty = async (uuid: any) => {
  try {
    const res= await Client.property.delete(uuid)
    console.log("Delete:",res)
     return res
  } catch (error) {
    console.log("Error:",error)
        throw error
  }
}


export const getPropertyById = async (id: string) => {
  return await Client.property.getByid(id)
}
