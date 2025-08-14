import axios from "axios"
import { GetLocalStorage } from "../utils/localstorage";

const Axios = axios.create({
	baseURL: import.meta.env.VITE_PUBLIC_API_URL,
	timeout: 5000000,
	headers: {
		'Content-Type': 'application/json',
	},
});

Axios.interceptors.request.use((config) => {
	const token = GetLocalStorage('token');
	// if (token) {
		config.headers['authorization'] = `901950738f66529b9c9b041f3c790f6ac3ce85811ffd904af624afb82c1502c3c610efd95d1d36dd966ad4275eacbd686d16f86d274b68586f07694f9e13db10127858b7f07707bd78404ca67d2b17ae4884444f2207e38452766880e66cd415215b7e06a9724d20909a1f79a119d19f6e35d94a018579cb26228b3b3c9edf72e147922a4b0543b895025d6bcdbace420d814c8ea0266b908129a3881d8771574268da75b1792b2c97a7a4c5c05347ed8d92f836369e8a8f4727028d879c024bfaafd087ed4e0eee0d125db9182ca0b7a2a5b79ffd43181635529661f0ff2944bdffe199819c1f0b469448c1166e17f7564c990ef60c564f120452f1bee3e2e7702297178ef395439a23fdb417a7f0b9b7fa188bb20c584c115f51419e6a5ddd0cd26e305c1b4dcf823f1af20bf3d8d300125db761b7ce2450e0cd282654fa2028021552f8ca31756c8af4d0fd4f58c7d0517c89cad301c52682cdc4d55e97c1dbe2c178d5e91cfe37c0e85a9952577b00aa366ffc378e466980ffaea8d8570f17d773fdb8ca62b84592ea3d5c4ccc2cae27d5f278e653ebc40a50d9f01ef405141904de0581a85f2216b6d36155b4bce38c6d1b74f0b9f26ed37af24d3b29d017e31b15cba8ed8a3a4bdd68e5ea2351e4cef2496b3c6b20adbfb0280a2e472966412933cc3c8bce7326507245e0a99bdb5d34dd571bef3f074caaaef863e83f69ee31aeaf2fe1eae9587bb83f62f22c3fc52f99991ab425de85d18eba32447b52cd0a13965c25ed17e783d8ede9993455cd991ae0fadd3c4516071dc1bcd1a5`
	// }
	return config;
});


class HttpClient {
	async get(url: string, params?: any) {
		const response = await Axios.get(url, { params });
		return response.data;
	}

	async post(url: string, data: any, params?: any) {
		const response = await Axios.post(url, data, { params });
		return response.data;
	}

	async update(url: string, data?: any, params?: any) {
		const response = await Axios.put(url, data, { params });
		return response.data;
	}

	async delete(url: string, data?: any) {
		const response = await Axios.delete(url, data);
		return response;
	}

	async uploadFile(url: string, data: any) {
		const response = await Axios.post(url, data, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
		return response.data;
	}

	async fileGet(url: string, params: any, userType?: undefined) {
        const response = Axios.get(url, {
            params,
            responseType: 'blob',
            headers: {
                'User-Type': userType,
            },
        });
        return response;
    }
}

export default new HttpClient();