import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AuthApi from '../api/authApi'


export default function Login() {
    const [email, setEmail]       = useState('')
    const [password, setPassword] = useState('')
    const [error, setError]       = useState('')
    const [loading, setLoading]   = useState(false)

    const navigate  = useNavigate()

    const { login } = useAuth()
    // login 👆 función del contexto que guarda
    //          el usuario y token globalmente
    //          para que toda la app sepa quién está logueado

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const response = await AuthApi.login(email, password)
            // AuthApi.login 👆 hace POST /api/login a Laravel
            // await         👆 espera la respuesta antes de continuar
            // response.data 👆 contiene { token, user }

            login(response.data.user, response.data.token)
            // login() 👆 guarda en el contexto y en localStorage:
            //   response.data.user  → { id, name, email, rol }
            //   response.data.token → "1|abc123..."

            navigate('/home')
            // 👆 redirige al dashboard después del login exitoso

        } catch (err) {
            setError(err.response?.data?.message || 'Credenciales incorrectas')
            // err.response?.data?.message 👆 mensaje que regresa Laravel
            //                                cuando las credenciales son malas
            // || 'Credenciales incorrectas' 👆 mensaje por defecto
            //                                  si Laravel no manda mensaje
        } finally {
            setLoading(false)
            // finally 👆 se ejecuta siempre, haya error o no
            //            apagamos el loading
        }
    }

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">
                        Inicia sesion con tu cuenta
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                    {/* MENSAJE DE ERROR                              */}
                    {/* El && significa: si error tiene texto, muestra */}
                    {/* el div. Si está vacío, no muestra nada         */}
                    {error && (
                        <div className="mb-4 bg-red-50 border border-red-200
                                        text-red-600 text-sm px-4 py-3 rounded-md">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-black">
                                Correo electronico
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-black">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full justify-center rounded-md bg-indigo-500
                                           px-3 py-1.5 text-sm/6 font-semibold text-white
                                           hover:bg-indigo-400 disabled:bg-indigo-300
                                           disabled:cursor-not-allowed cursor-pointer
                                           focus-visible:outline-2 focus-visible:outline-offset-2
                                           focus-visible:outline-indigo-500"
                            >
                                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
