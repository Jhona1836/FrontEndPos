import Icon from '@mdi/react'
import { mdiViewDashboard, mdiPackageVariant, mdiWarehouse, mdiCartOutline, mdiCashRegister, mdiAccountGroup, mdiStore, mdiMenu, mdiClose  } from '@mdi/js'
import { Link, useLocation } from 'react-router-dom'
import LogoutButton from './LogoutButton'
import { useSidebar } from '../context/SidebarContext'


const itemsMenu = [
    { label: 'Dashboard',     path: '/home',      icon: mdiViewDashboard },
    { label: 'Productos',     path: '/products',  icon: mdiPackageVariant },
    { label: 'Inventario',    path: '/inventory', icon: mdiWarehouse },
    { label: 'Ventas',        path: '/sales',     icon: mdiCartOutline },
    { label: 'Corte de caja', path: '/cash-cut',  icon: mdiCashRegister },
    { label: 'Usuarios',      path: '/users',     icon: mdiAccountGroup },
]

export default function SideBar() {
    const location = useLocation()
    const { isOpen, setIsOpen } = useSidebar()

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-3 left-3 z-50 md:hidden bg-white p-2 rounded-lg border border-gray-200 shadow-sm cursor-pointer"
            >
                <Icon path={isOpen ? mdiClose : mdiMenu} size={1} />
            </button>

            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside className={`
                fixed top-0 left-0 z-40
                w-55 h-full
                bg-white border-r border-gray-200
                transition-transform duration-300
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0
            `}>
          
            <div className='flex flex-col h-full'>

                   {/* Titulo */}
                <div className='flex items-center gap-3 border-2 border-black'>
                    <Icon
                    path={mdiStore}
                    size={3}
                    />
                    <h1>Sistema de ventas</h1>
                </div>

            {/* Menu */}
            <nav className='flex-1 overflow-y-auto'>
                <ul className='space-y-1'>
                    {itemsMenu.map((item) =>{

                        const isActive = location.pathname === item.path

                        return(
                            <li key={item.path}>
                                <Link
                                to={item.path}
                                className={`
                                    flex items-center gap-5 mt-3
                                    px-5 py-3.5 rounded-lg text-sm
                                    transistion-color cursor-pointer
                                    ${isActive ? 'bg-indigo-100 text-indigo-600 font-medium'
                                        :'text-gray-600 hover:bg-blue-700 hover:text-white'}
                                    `}
                                >
                                    <Icon path={item.icon}
                                    size={0.90}
                                    className={isActive ? 'text-indigo-600' : 'text-gray-400'}/>
                                        
                                    {item.label}
                                
                                </Link>
                            </li>
                        )}
                     )}
                </ul>
            </nav>
            
            {/* Boton de Cerrar Sesion */}
            <div className=' flex justify-center'>
                <LogoutButton/>
            </div>
            </div>
        </aside>
        </>
    )
}