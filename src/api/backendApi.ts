import axios from 'axios'

const backendApi = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
})

// Interceptor para incluir token automáticamente (si existe)
backendApi.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, error => {
    return Promise.reject(error)
})

export default backendApi
