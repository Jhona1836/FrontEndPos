import Icon from '@mdi/react'
import { mdiAccountCircle } from '@mdi/js'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
    const { user } = useAuth()

    return (
        <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
            <div>
                {/* Puedes agregar breadcrumbs o título de página aquí */}
            </div>

            <div className="flex items-center gap-3">
                <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                        {user?.name || 'Usuario'}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                        {user?.rol || 'Usuario'}
                    </p>
                </div>
                
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                    {user?.nombre?.charAt(0).toUpperCase() || 
                     user?.name?.charAt(0).toUpperCase() || 
                     <Icon path={mdiAccountCircle} size={1.5} />}
                </div>
            </div>
        </nav>
    )
}