import axios from 'axios';
import apiConfig from './apiConfig';

const axiosInstance = axios.create({
    baseURL: apiConfig.baseURL,
});

export default axiosInstance;
