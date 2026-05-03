import api from "./axios";

const categoriaApi = {
    obtenerCategorias : ()=> {
        return api.get('/categories')
    }
}

export default categoriaApi