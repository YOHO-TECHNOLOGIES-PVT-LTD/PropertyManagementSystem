import HttpClient from "./httpClient";
import { HTTP_END_POINTS } from "./httpEndpoints";

class Client {
    auth = {
        register: (data: any)=> HttpClient.post(HTTP_END_POINTS.auth.register, data),
        update_password: (data: any) =>
			HttpClient.update(HTTP_END_POINTS.auth.updatePassword, data),
		login: (data: any) => HttpClient.post(HTTP_END_POINTS.auth.login, data),
		me: () => HttpClient.get(HTTP_END_POINTS.auth.login),
    };
	dashboard={
		get:(data:any)=>HttpClient.get(HTTP_END_POINTS.DashBoard.get,data),
	}
    property = {
        getAll: (params: string) =>
			HttpClient.get(HTTP_END_POINTS.property.getAll, params),
		create: (params: string) =>
			HttpClient.post(HTTP_END_POINTS.property.create, params),
		edit: (data: any, params: string) => HttpClient.update(HTTP_END_POINTS.property.update+ params, data),
		delete: (params: string) => HttpClient.delete(HTTP_END_POINTS.property.delete, params),
		getByid: (params: string) => HttpClient.get(HTTP_END_POINTS.property.get.replace(":uuid", params.uuid), params),
		getProperty: (data: any) => HttpClient.get(HTTP_END_POINTS.property.getProperty, data),
    };
    land = {
        getAll: (params: string) =>
			HttpClient.get(HTTP_END_POINTS.land.getAll, params),
		create: (params: string) =>
			HttpClient.post(HTTP_END_POINTS.land.create, params),
		edit: (data: any, params: string) => HttpClient.update(HTTP_END_POINTS.land.update, params, data),
		delete: (params: string) => HttpClient.delete(HTTP_END_POINTS.land.delete, params),
		getByid: (params: string) => HttpClient.get(HTTP_END_POINTS.land.get, params),
    };
    tenant = {
        getAll: (data: string) =>
			HttpClient.get(HTTP_END_POINTS.tenant.getAll, data),
		create: (params: string) =>
			HttpClient.post(HTTP_END_POINTS.tenant.create, params),
		edit: (data: any, params: string) => HttpClient.update(HTTP_END_POINTS.tenant.update, params, data),
		delete: (params: string) => HttpClient.delete(HTTP_END_POINTS.tenant.delete, params),
		getByid: (params: string) => HttpClient.get(HTTP_END_POINTS.tenant.get.replace(":uuid", params.uuid), params),
    };
    unit = {
        getAll: (params: string) =>
			HttpClient.get(HTTP_END_POINTS.unit.getAll, params),
		create: (params: string) =>
			HttpClient.post(HTTP_END_POINTS.unit.create, params),
		getByid: (params: string) => HttpClient.get(HTTP_END_POINTS.unit.get, params),
    };
    rent = {
        getAll: (params: string) =>
			HttpClient.get(HTTP_END_POINTS.rent.getAll, params),
		getByid: (params: string) => HttpClient.get(HTTP_END_POINTS.rent.get, params),
    };
    lease = {
        getAll: (params: string) =>
			HttpClient.get(HTTP_END_POINTS.lease.getAll, params),
		getByid: (params: string) => HttpClient.get(HTTP_END_POINTS.lease.get, params),
    };
    
    maintenance = {
        getAll: (params: string) =>
			HttpClient.get(HTTP_END_POINTS.maintenance.getAll, params),
		create: (params: string) =>
			HttpClient.post(HTTP_END_POINTS.maintenance.create, params),
		edit: (data: any, params: string) => HttpClient.update(HTTP_END_POINTS.maintenance.update, params, data),
		delete: (params: string) => HttpClient.delete(HTTP_END_POINTS.maintenance.delete, params),
		getByid: (params: string) => HttpClient.get(HTTP_END_POINTS.maintenance.get, params),
    };

	notification ={
		getAll:(params:string)=>
			HttpClient.get(HTTP_END_POINTS.Notification.getAll,params),
		delete:(params:string)=>
			HttpClient.delete(HTTP_END_POINTS.Notification.delete,params),
		update:(data:any,params:string)=>HttpClient.update(HTTP_END_POINTS.Notification.update,data,params)
	}

}

export default new Client();