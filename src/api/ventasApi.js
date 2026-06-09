import api from "./axios";

const ventasApi = {


    generarVenta:(payload) => {
        return api.post('/sales', payload)
    }
}

export default ventasApi