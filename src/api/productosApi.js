import api from "./axios";


const productosApi = {
    obtenerTodos : () => {
        return api.get('/products')
    },

    obtenerUno: (id) => {
        return api.get(`/products/${id}`)
        
    },
    crearProducto: (payload) => {
        return api.post('/products', payload)
    },
    actualizarProducto: (id, payload) => {
        return api.put(`/products/${id}`, payload)
    },
    borrarProducto: (id) => {
    return api.delete(`/products/${id}`)
}

}

export default productosApi