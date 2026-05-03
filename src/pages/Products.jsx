import { useState, useEffect } from "react"
import productosApi from "../api/productosApi"
import DataTablePrime from "../components/GlobalComponents/DataTablePrime"
import AddProducto from "../components/Products/AddProduct"
import DeleteProduct from "../components/Products/DeleteProduct"

export default function Products() {
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


    const columns = [
        {
            name: 'Sku',
            selector: row => row.sku
        },
        {
            name: 'Codigo de Barras',
            selector: row => row.codigoBarras
        },
        {
            name: 'Nombre del Producto',
            selector: row => row.nombre
        },
        {
            name: 'Precio de Venta',
            selector: row => row.precioVenta
        },
        {
            name: 'Stock',
            selector: row => row.stock
        },
        {
            name: 'Categoria',
            selector: row => row.categoria?.nombre
        }, {
            name: "Acciones",
            cell: (row) => (
                <div className="flex gap-2">
                    <AddProducto
                        producto={row}
                        onProductoGuardado={cargarProductos}
                    />
                    <DeleteProduct
                        id={row.id}
                        onDelete={cargarProductos}
                    />
                </div>
            )
        }

    ]


    return (
        <div>
            <div className="flex justify-end mb-4 ">
                <AddProducto />
            </div>
            <DataTablePrime
                title='Productos'
                columns={columns}
                data={productos}
            />

        </div>
    )
}