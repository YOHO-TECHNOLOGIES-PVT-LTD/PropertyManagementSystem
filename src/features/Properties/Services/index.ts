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

export const editProperty = async (uuid: string, data: any) => {
    try {
        const res =await Client.property.edit(uuid,data)
        console.log("edit",res)
        console.log("Edit data",res)
        return res
    } catch (error) {
        console.log("Error:",error)
        throw error
    }
}

export const deleteProperty = async (id: string) => {
  return await Client.property.delete(id)
}

export const getPropertyById = async (id: string) => {
  return await Client.property.getByid(id)
}
