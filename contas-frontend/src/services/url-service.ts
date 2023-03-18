import axios from "axios";

export const backend = axios.create({
    baseURL: 'http://localhost:8080/',
});

backend.interceptors.request.use((request) => {
    request.headers['AUTHORIZATION'] = localStorage.getItem('token');
    return request;
}, (error) => Promise.reject(error));