import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import Login from './pages/login'
import Dashboard from './pages/Dashboard'
import { AuthProvider, useAuth } from './context/AuthContext'
import { LoadingProvider, useLoading } from './context/LoadingContext'
import { setLoadingHandlers } from './api/axios'
import LoadingOverlay from './components/LoadingOverlay'
import MainLayout from './layouts/MainLayout'
import Products from './pages/Products'

function AxiosLoader() {
    const { show, hide } = useLoading()

    useEffect(() => {
        setLoadingHandlers(show, hide)
    }, [show, hide])

    return null
}

function PrivateRoute({ children }) {
    const { user, loading } = useAuth()

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-500">Cargando...</p>
            </div>
        )
    }

    return user ? children : <Navigate to="/login" />
}


function AppContent() {
    const { isLoading } = useLoading()

    return (
        <>
            <LoadingOverlay loading={isLoading} />


            <AxiosLoader />

            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />

                <Route element={
                    <PrivateRoute>
                        <MainLayout />
                    </PrivateRoute>
                }>
                    <Route path="/home" element={<Dashboard />} />                                        
                    <Route path="/products" element={<Products/>} />

                </Route>

                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </>
    )
}

function App() {
    return (
        <LoadingProvider>
            <AuthProvider>
                <BrowserRouter>
                    <AppContent />
                </BrowserRouter>
            </AuthProvider>
        </LoadingProvider>
    )
}

export default App
