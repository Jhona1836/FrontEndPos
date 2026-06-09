import api from "./axios";

const dashboardApi = {
    obtenerDatos: () => {
        return api.get('/dashboard')
    },
    graficaMensual:() =>{
        return api.get('/dashboard/ventas-mensual-semanas')
    }
}
export default dashboardApi
