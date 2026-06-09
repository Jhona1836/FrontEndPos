import DataTablePrime from "../components/GlobalComponents/DataTablePrime"
import productosApi from "../api/productosApi"
import { useState, useEffect } from "react"
import { Button, Modal, Input } from "antd"
import AddProductoTicket from "../components/VentasComponents/addProductTicket"
import ventasApi from "../api/ventasApi"

export default function Venta() {

    const [productos, setProductos] = useState([])
    const [ticket, setTicket] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [monto, setMonto] = useState()


    const showModal = () => {
        setModalVisible(true)
    }

    const ocultarModal = () => {
        setModalVisible(false)
    }

    const AgregarProducto = (producto) => {
        const existeIndex = ticket.findIndex(item => item.id === producto.id)

        if (existeIndex >= 0) {
            const nuevoTicket = [...ticket]
            nuevoTicket[existeIndex].cantidad += 1
            setTicket(nuevoTicket)
        } else {
            const productoConKey = {
                ...producto,
                cantidad: 1
            }
            setTicket([...ticket, productoConKey])
        }
    }

    const actualizarCantidad = (index, nuevaCantidad) => {
        const nuevoTicket = [...ticket]
        nuevoTicket[index].cantidad = nuevaCantidad
        setTicket(nuevoTicket)
    }

    const eliminarProducto = (index) => {
        const nuevoTicket = ticket.filter((_, i) => i !== index)
        setTicket(nuevoTicket)
    }

    const limpiarTicket = () => {
        setTicket([])
    }

    const total = ticket.reduce((acc, item) =>
        acc + (item.precioVenta * (item.cantidad || 1)), 0
    )

    const cargarProductos = async () => {
        try {
            const res = await productosApi.obtenerTodos()
            const producto = res.data.datos.filter(p => p.activo === true)
            setProductos(producto)
        } catch {
            console.error('No se pudieron cargar los productos')
        }
    }

    const generarVenta = () => {
        ocultarModal()
        const payload = {
            payment_method_id: 1,
            monto_recibido: parseFloat(monto) || 0,
            notas: "",
            items: ticket.map(item => ({
                product_id: item.id,
                cantidad: item.cantidad
            }))
        }

        ventasApi.generarVenta(payload)
            .then(() => {
                Console.log('Venta generada con éxito')
                limpiarTicket()
            })
            .catch(() => {
                console.log('Error al generar la venta')
            })
    }

    useEffect(() => {
        cargarProductos();
    }, [])

    const columns = [
        {
            name: 'Código de Barras',
            selector: row => row.codigoBarras,
            sortable: true,
        },
        {
            name: 'Nombre del Producto',
            selector: row => row.nombre,
            sortable: true,
        },
        {
            name: 'Precio de Venta',
            selector: row => `$${row.precioVenta}`,
            sortable: true,
        },
        {
            name: 'Acciones',
            cell: (row) => (
                <Button
                    type="primary"
                    className="cursor-pointer transition-colors duration-200"
                    onClick={() => AgregarProducto(row)}
                >
                    Agregar
                </Button>
            )
        }
    ]

    const totalItems = ticket.reduce((a, b) => a + b.cantidad, 0)

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

            <div className="lg:col-span-8">
                <DataTablePrime
                    title='Productos'
                    columns={columns}
                    data={productos}
                />
            </div>

            <div className="lg:col-span-4 flex flex-col h-[80vh]">

                {/* Ticket Header */}
                <div className="flex-none bg-blue-800 text-white p-3 rounded-t-lg flex items-center justify-between">
                    <span className="font-bold text-lg">Ticket</span>
                    <span className="bg-white text-blue-800 px-3 py-0.5 rounded-full text-sm font-bold">
                        {totalItems} productos
                    </span>
                </div>

                {/* Ticket Items */}
                <div className="flex-1 overflow-y-auto bg-white border-x border-gray-200 p-3 space-y-2">
                    {ticket.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                            <svg className="w-12 h-12 mb-2 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                            </svg>
                            <p className="text-sm font-medium">Ticket vacío</p>
                            <p className="text-xs mt-1">Seleccione productos</p>
                        </div>
                    ) : (
                        ticket.map((item, index) => (
                            <AddProductoTicket
                                key={`${item.id}-${index}`}
                                nombre={item.nombre}
                                sku={item.sku}
                                precioVenta={item.precioVenta}
                                cantidad={item.cantidad}
                                cantidadOnChange={(value) => actualizarCantidad(index, value || 1)}
                                eliminar={() => eliminarProducto(index)}
                            />
                        ))
                    )}
                </div>

                {/* Total & Actions */}
                <div className="flex-none bg-white border border-gray-200 rounded-b-lg border-t-0 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-gray-600">Total</span>
                        <span className="text-2xl font-bold text-blue-800">${total.toFixed(2)}</span>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            danger
                            onClick={limpiarTicket}
                            className="flex-1 cursor-pointer transition-colors duration-200"
                            disabled={ticket.length === 0}
                        >
                            Limpiar
                        </Button>
                        <Button
                            type="primary"
                            className="flex-1 cursor-pointer transition-colors duration-200"
                            onClick={showModal}
                        >
                            Generar Venta
                        </Button>

                        <Modal
                            open={modalVisible}
                            onCancel={ocultarModal}
                            onOk={generarVenta}
                        >

                            Monto Recibido

                            <Input className="m-3"
                                value={monto}
                                onChange={(e) => setMonto(e.target.value)}
                            />

                        </Modal>

                    </div>
                </div>

            </div>
        </div>
    )
}
