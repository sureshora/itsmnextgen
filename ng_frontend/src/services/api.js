import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3074', // Backend server base URL
});

export default api;