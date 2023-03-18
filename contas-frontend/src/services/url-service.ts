import axios from "axios";

export const backend = axios.create({
    baseURL: 'http://localhost:8080/',
});

backend.interceptors.request.use((request) => {
    request.headers['AUTHORIZATION'] = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJMdWNhc0BnbWFpbC5jb20iLCJleHAiOjE2NzkxNDIzMjZ9.y0OBciEEwwM7Hp0NGI28jiHs1hqgideNkIWUJiPUmWlhA9OVYBUPPVV6cuXwDUmFMaJkR0xqruUudjLKALhlSw';
    return request;
}, (error) => Promise.reject(error));