import { useAuth } from '../context/AuthContext'


export default function Dashboard() {
    const { user } = useAuth()
    // 👆 solo necesitamos user para mostrar el nombre

    return (
        <div className="min-h-screen bg-gray-100">


            <div className="sm:ml-64 p-4">
                <h1 className="text-2xl font-bold text-gray-800">
                    Dashboard
                </h1>
                <p className="text-gray-500">
                    Bienvenido, {user?.name}
                </p>
            </div>

        </div>
    )
}
