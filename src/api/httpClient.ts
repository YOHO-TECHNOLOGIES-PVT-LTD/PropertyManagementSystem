import axios from "axios"

const Axios = axios.create({
	baseURL: import.meta.env.VITE_PUBLIC_API_URL,
	timeout: 5000000,
	headers: {
		'Content-Type': 'application/json',
	},
});

Axios.interceptors.request.use((config) => {
	const token = localStorage.getItem('token');
	if (token) {
		config.headers['authorization'] = token
	}
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