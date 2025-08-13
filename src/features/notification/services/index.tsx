
import Client from '../../../api/index'

export const getAllNotification = async (params?:any)=>{
    try{
   const response = await  Client.notification.getAll(params)
   if(response){
    return response;
   }
    }
    catch(err){
        console.log('error',err)
    }
}

export const deleteNotification = async (params:any)=>{
    try{
        const response = await Client.notification.delete(params)
        if (response){
            return response
        }
    }
    catch(err){
        console.log(err,'error ')
    }
}