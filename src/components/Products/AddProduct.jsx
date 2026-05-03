import React from "react";
import { Button, Modal, Form, Input, Select, InputNumber, Switch } from "antd"
import { useState } from "react";
import { CheckOutlined, CloseOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
import { message } from "antd";
import { useEffect } from "react";
import categoriaApi from "../../api/categoriasApi";
import productosApi from "../../api/productosApi";


export default function AddProducto({ producto = null, onProductoGuardado }) {
    const [ventana, setVentana] = useState(false)
    const [form] = Form.useForm();
    const [categorias, setCategorias] = useState([])
    const esEdicion = !!producto


    useEffect(() => {
        const cargarCategorias = async () => {
            const respuesta = await categoriaApi.obtenerCategorias()
            const datosRecuperados = respuesta.data.datos
            // const categoriasMap = datosRecuperados.map(c => c.id && c.nombre)
            // console.log(categoriasMap)
            console.log(datosRecuperados)
            setCategorias(datosRecuperados)
        };
        cargarCategorias()
    }, [])

    useEffect(() => {
        if (producto) {
            form.setFieldsValue(producto)
        }
    }, [producto])


    const handleClick = () => {
        setVentana(true)
    }

    const closeClick = () => {
        setVentana(false)
    }
    const onFinish = async (value) => {

        try {
            if (esEdicion) {
                await productosApi.actualizarProducto(producto.id, value)
                message.success("Se edito el producto correctamente")
            }
            else {
                await productosApi.crearProducto(value)
                message.success("Se creo el producto correctamente")
            }
            setVentana(false)
            form.resetFields()
            onProductoGuardado?.()

        } catch (error) {
            message.error("Hubo un error con el producto")
            console.log("Error de producto", error)
        }

    }

    const reglasInputNumber = {
        mode: 'spinner',
        min: 0.1,
        style: { width: '100%' }
    }

    const opcionesUnidad = [
        { value: 'pieza', label: 'Pieza' },
        { value: 'kg', label: 'Kilogramo' },
        { value: 'litro', label: 'Litro' },
        { value: 'caja', label: 'Caja' },
        { value: 'paquete', label: 'Paquete' }
    ]



    return (
        <div>
            <Button onClick={handleClick}
                style={{
                    color: 'green'
                }}
                icon={esEdicion ? <EditOutlined /> : <PlusOutlined />}>
                {esEdicion ? "" : "Agregar Nuevo"}
            </Button>

            <Modal
                title={esEdicion ? "Actualizar Producto" : "Agregar Producto"}
                open={ventana}
                onOk={() => form.submit()}
                onCancel={closeClick}
                centered
                destroyOnClose={true}

                destroyOnHidden={true}
                okText="Guardar"
                cancelText="Cancelar"
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    {/* Nombre */}
                    <Form.Item
                        name='nombre'
                        label='Nombre del producto'
                        rules={[{
                            required: true,
                            message: "Se requiere el nombre del producto para poder crearlo"
                        }]}
                    >
                        <Input type="text" />
                    </Form.Item>

                    <div className="grid grid-cols-2 gap-5">

                        {/* Sku */}
                        <Form.Item
                            name="sku"
                            label="Sku"
                            rules={[{
                                required: true,
                                message: "Se requiere el Sku del producto para poder crearlo"
                            }]}
                        >
                            <Input type={"text"} />
                        </Form.Item>

                        {/* Codigo de Barras */}
                        <Form.Item
                            name="codigoBarras"
                            label="Codigo de Barras"
                            rules={[{
                                required: true,
                                message: "Se requiere le codigo de barras para agregar producto"
                            }]}
                        >
                            <Input type={"text"} />
                        </Form.Item>
                    </div>

                    {/* Descripcion */}
                    <Form.Item
                        name="descripcion"
                        label="Descripcion del Producto"
                        rules={[{
                            required: true,
                            message: "Se requiere de una descripcion para el producto"
                        }]}
                    >
                        <Input type={"text"}
                            className="w-full h-15"
                            placeholder="Describe tu producto en este recuadro"
                        />

                    </Form.Item>

                    <div className="grid grid-cols-3 gap-6 justify-center">

                        {/* PRECIO  AL PUBLICO */}
                        <Form.Item
                            name="precioVenta"
                            label="Precio al Publico"
                            rules={[{
                                required: true,
                                message: "Es necesario el costo para poder agregar el producto"
                            }]}
                        >
                            <InputNumber
                                {...reglasInputNumber}
                                prefix="$"

                            />

                        </Form.Item>

                        {/* PRECIO DE COMPRA  */}
                        <Form.Item
                            name="precioCosto"
                            label="Precio a la tienda"
                            rules={[{
                                required: true,
                                message: "Es necesario el costo para poder agregar el producto"
                            }]}
                        >
                            <InputNumber
                                {...reglasInputNumber}
                                prefix="$"
                            />

                        </Form.Item>

                        {/* Stock */}
                        <Form.Item
                            name="stock"
                            label="Stock en almacen"
                            rules={[{
                                required: true,
                                message: "Es necesario insertar el stock"
                            }]}
                        >
                            <InputNumber
                                {...reglasInputNumber}

                            />

                        </Form.Item>

                    </div>

                    <div className="grid grid-cols-3 gap-6 justify-center mt-001">

                        {/* Stock Minimo */}
                        <Form.Item
                            name="stockMinimo"
                            label="Stock Minimo"
                            rules={[{
                                required: true,
                                message: "Es necesario agregar el stock minimo"
                            }]}
                        >
                            <InputNumber
                                {...reglasInputNumber}
                            />

                        </Form.Item>

                        {/* Unidad */}
                        <Form.Item
                            name="unidad"
                            label="Unidad"
                            rules={[{
                                required: true,
                                message: "Es necesario la unidad para poder agregar un producto"
                            }]}
                        >
                            <Select
                                defaultValue='Kilogramo'
                                style={{ height: 25 }}
                                options={opcionesUnidad}
                            />

                        </Form.Item>

                        {/* Iva */}
                        <Form.Item
                            name="iva"
                            label="Iva"
                            rules={[{
                                required: true,
                                message: "Es necesario agregar el Iva"
                            }]}
                        >
                            <InputNumber
                                {...reglasInputNumber}
                                prefix="%"
                            />

                        </Form.Item>

                    </div>

                    <div className="grid grid-cols-2 gap-2">

                        {/* Activo */}
                        <Form.Item
                            name="activo"
                            label="¿Disponible para venta inmediata?"
                            valuePropName="checked"
                            initialValue={1}
                            getValueFromEvent={(checked) => (checked ? 1 : 0)}
                        >
                            <Switch
                                checkedChildren={<CheckOutlined />}
                                unCheckedChildren={<CloseOutlined />}
                            />
                        </Form.Item>

                        {/* Categoria */}
                        <Form.Item
                            name="category_id"
                            label="Categoria"
                            rules={[{
                                required: true,
                                message: "Es necesario la unidad para poder agregar un producto"
                            }]}
                        >
                            <Select
                                defaultValue='categoria'
                                style={{ height: 25 }}
                                options={
                                    categorias.map(cat => ({
                                        value: cat.id,
                                        label: cat.nombre
                                    })

                                    )
                                }
                            />

                        </Form.Item>

                    </div>





                </Form>
            </Modal>
        </div>
    );

}