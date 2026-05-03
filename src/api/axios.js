import axios from "axios";

const api = axios.create({
    // baseURL: 'https://systempos-1.onrender.com/api',
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
})

let mostrarLoading = null
let ocultarLoading = null

export function setLoadingHandlers(show, hide) {
    mostrarLoading = show
    ocultarLoading = hide
}

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    if (mostrarLoading) mostrarLoading()


    return config
})

api.interceptors.response.use(
    (response) => {
        if (ocultarLoading) ocultarLoading()
        return response
    },
    (error) => {
        if (ocultarLoading) ocultarLoading()

        if (error.response?.status === 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

export default api