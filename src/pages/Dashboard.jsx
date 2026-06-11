import { useAuth } from '../context/AuthContext'
import { useState, useEffect } from 'react'
import dashboardApi from '../api/dashboardApi'
import { BarChart, CartesianGrid, YAxis, XAxis, Bar, ResponsiveContainer, LineChart, Line, Legend, Tooltip } from 'recharts'
import Icon from '@mdi/react'
import { mdiCurrencyUsd, mdiCalendarWeek, mdiCalendarMonth, mdiTrendingUp } from '@mdi/js'
import TableInventory from '../components/Inventory/TableInventory'

export default function Dashboard() {
    const [datos, setDatos] = useState(null)
    const [graficaMensual, setGraficaMensual] = useState(null)
    const [graficaSemanal, setGraficaSemanal] = useState(null)
    const [graficaProductos, setGraficaProductos] = useState(null)
    const [loading, setLoading] = useState(true)

    const { user } = useAuth()

    useEffect(() => {
        let cancelled = false

        const loadData = async () => {
            try {
                const res = await dashboardApi.obtenerDatos()
                if (cancelled) return
                setDatos(res.data.datos)
                setGraficaSemanal(res.data.datos.ventas_por_dia)
                setGraficaProductos(res.data.datos.top_productos)
            } catch (err) {
                console.error('Error al obtener datos del dashboard', err)
            } finally {
                if (!cancelled) setLoading(false)
            }
        }

        const loadMonthly = async () => {
            try {
                const res = await dashboardApi.graficaMensual()
                if (cancelled) return
                setGraficaMensual(res.data.datos.semanas)
            } catch (err) {
                console.error('Error al obtener datos de la gráfica mensual', err)
            }
        }

        loadData()
        loadMonthly()

        return () => { cancelled = true }
    }, [])

    const kpis = [
        {
            label: 'Venta Diaria',
            value: `$${datos?.ventas_hoy ?? 0}`,
            icon: mdiCurrencyUsd,
            bg: 'bg-blue-50',
            iconColor: 'text-blue-600',
        },
        {
            label: 'Ventas Semanales',
            value: `$${datos?.ventas_semanal ?? 0}`,
            icon: mdiCalendarWeek,
            bg: 'bg-indigo-50',
            iconColor: 'text-indigo-600',
        },
        {
            label: 'Ventas Mensuales',
            value: `$${datos?.ventas_mes ?? 0}`,
            icon: mdiCalendarMonth,
            bg: 'bg-emerald-50',
            iconColor: 'text-emerald-600',
        },
        {
            label: 'Ticket Promedio',
            value: `$${datos?.ticket_promedio ?? '—'}`,
            icon: mdiTrendingUp,
            bg: 'bg-amber-50',
            iconColor: 'text-amber-600',
        },
    ]

    return (
        <div className="space-y-6">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {kpis.map((kpi, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 transition-all duration-200 hover:shadow-md cursor-pointer"
                    >
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-500">{kpi.label}</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {loading ? <span className="text-gray-300">—</span> : kpi.value}
                                </p>
                            </div>
                            <div className={`w-12 h-12 ${kpi.bg} rounded-xl flex items-center justify-center shrink-0`}>
                                <Icon path={kpi.icon} size={1.2} className={kpi.iconColor} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-base font-semibold text-gray-900 mb-1">Ventas Semanales</h3>
                    <p className="text-xs text-gray-500 mb-4">Últimos 7 días</p>
                    <div className="w-full" style={{ height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={graficaSemanal || []}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                                <XAxis dataKey="fecha" tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={{ stroke: '#E5E7EB' }} tickLine={false} />
                                <YAxis width={60} tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={{ stroke: '#E5E7EB' }} tickLine={false} />
                                <Tooltip
                                    cursor={{ fill: '#F9FAFB' }}
                                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="total" fill="#6366F1" radius={[4, 4, 0, 0]} isAnimationActive={true} maxBarSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-base font-semibold text-gray-900 mb-1">Ventas Mensuales</h3>
                    <p className="text-xs text-gray-500 mb-4">Comparativa por semana</p>
                    <div className="w-full" style={{ height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={graficaMensual || []}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                                <XAxis dataKey="semana" tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={{ stroke: '#E5E7EB' }} tickLine={false} />
                                <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={{ stroke: '#E5E7EB' }} tickLine={false} />
                                <Tooltip
                                    cursor={{ stroke: '#6366F1', strokeWidth: 1, strokeDasharray: '4 4' }}
                                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                                />
                                <Legend wrapperStyle={{ fontSize: 13, paddingTop: 8 }} />
                                <Line type="monotone" dataKey="total" stroke="#6366F1" strokeWidth={2.5} dot={{ fill: '#6366F1', r: 4, strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} name="Total" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-base font-semibold text-gray-900 mb-1">Productos Más Vendidos</h3>
                    <p className="text-xs text-gray-500 mb-4">Top productos por cantidad</p>
                    <div className="w-full" style={{ height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={graficaProductos || []} layout="vertical" barSize={20}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" horizontal={false} />
                                <XAxis type="number" tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={{ stroke: '#E5E7EB' }} tickLine={false} />
                                <YAxis dataKey="nombre" type="category" tick={{ fontSize: 12, fill: '#6B7280' }} width={120} axisLine={false} tickLine={false} />
                                <Tooltip
                                    cursor={{ fill: '#F9FAFB' }}
                                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="total_vendido" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <Icon path={mdiTrendingUp} size={1.5} className="text-gray-300" />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 mb-1">Ventas por Método de Pago</h3>
                    <p className="text-sm text-gray-500">Próximamente</p>
                </div>
            </div>


            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6 '>
                <h3 className="text-base font-semibold text-gray-900 mb-1">Produtos Faltantes</h3>
                <TableInventory limit={3} />
            </div>
        </div>
    )
}
