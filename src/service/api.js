import axios from "axios";
import { getItem } from "../helpers/persistence-storage";

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.request.use(config => {
	const token = getItem('token')
	const authorization = token ? `Bearer ${token}` : '';
	config.headers.Authorization = authorization
	return config
})

export default axios;
