import { useState, useEffect } from "react"
import productosApi from "../../api/productosApi"
import DataTablePrime from "../GlobalComponents/DataTablePrime"
import WarningFilled from "@ant-design/icons/WarningOutlined"

export default function TableInventory({ limit }) {
    const [productos, setProductos] = useState([])
    const [error, setError] = useState('')

    const cargarProductos = async () => {
        productosApi.obtenerTodos()
            .then(res => {
                const producto = res.data.datos.filter(p => p.activo === true)
                console.log("Productos", producto)
                setProductos(producto)
            })
            .catch(err => {
                setError('No se pudieron cargar los productos')
            })
    }

    useEffect(() => {
        cargarProductos()
    }, [])

    const productosMostrados = limit
        ? [...productos].sort((a, b) => a.stock - b.stock).slice(0, limit)
        : productos

    const columns = [
        {
            name: 'Sku',
            selector: row => row.sku,
            sortable: true,
        },
        {
            name: 'Codigo de Barras',
            selector: row => row.codigoBarras
        },
        {
            name: 'Nombre del Producto',
            selector: row => row.nombre,
            sortable: true,
        },
        {
            name: 'Precio de Venta',
            selector: row => row.precioVenta,
            sortable: true,
        },
        {
            name: 'Stock',
            selector: row => row.stock,
            sortable: true,
            id: 'stock',
        },
        {
            name: 'Advertencia',
            selector: row => {
                if (row.stock < 10) {
                    return <WarningFilled style={{ color: 'red', fontSize: 20 }} />
                } if (row.stock >= 10 && row.stock < 21) {
                    return <WarningFilled style={{ color: 'orange', fontSize: 20 }} />
                }
                else {
                    return <WarningFilled style={{ color: 'green', fontSize: 20 }} />
                }
            }



        },
        {
            name: 'Categoria',
            selector: row => row.categoria?.nombre
        }

    ]


    return (
        <div>

            <DataTablePrime
                title='Productos'
                columns={columns}
                data={productosMostrados}
                defaultSortFieldId='stock'
                defaultSortAsc={true}
            />

        </div>
    )
}