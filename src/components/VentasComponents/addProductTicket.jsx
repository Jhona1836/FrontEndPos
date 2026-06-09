import { InputNumber, Button } from "antd"

export default function AddProductoTicket({nombre, sku, precioVenta, cantidad, cantidadOnChange, eliminar}) {

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-3 transition-colors duration-200 hover:border-blue-200">

            <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0 mr-2">
                    <h3 className="font-bold text-gray-900 text-sm truncate">{nombre}</h3>
                    <p className="text-xs text-gray-500">
                        SKU: <span className="text-gray-600">{sku}</span>
                    </p>
                </div>
                <div className="text-right flex-shrink-0">
                    <p className="font-bold text-blue-800 text-sm">${(precioVenta * cantidad).toFixed(2)}</p>
                </div>
            </div>

            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Cant:</span>
                    <InputNumber
                        min={1}
                        max={100}
                        value={cantidad}
                        onChange={cantidadOnChange}
                        size="small"
                        className="w-16"
                    />
                </div>
                <Button
                    onClick={eliminar}
                    danger
                    size="small"
                    className="cursor-pointer transition-colors duration-200"
                >
                    Eliminar
                </Button>
            </div>

        </div>
    )

}