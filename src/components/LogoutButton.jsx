// Importa lo que necesitas:

import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import AuthApi from "../api/authApi"
import Icon from "@mdi/react"
import {mdiLogout} from "@mdi/js"


export default function LogoutButton() {

    // Obtén logout del contexto
    // Obtén navigate

    const {logout} = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
           await AuthApi.logout()
            // Llama a AuthApi.logout()
        } catch (err) {
        } finally {
            logout()
            navigate('/login')

        }
    }

    return (
        <div className="flex flex-col h-full">
        <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 h-11 w-47 rounded-2xl hover:bg-red-400 bg-red-500 px-4 py-2 text-center text-blue-50">
            <Icon
            path={mdiLogout}
            size={1}
            />
         <span> Cerrar Sesión </span>
        </button>
        </div>
    )
}