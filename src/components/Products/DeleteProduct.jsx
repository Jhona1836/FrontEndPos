import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import {DeleteOutlined}  from '@ant-design/icons';
import productosApi from '../../api/productosApi';
import { message } from 'antd';


const confirm = async (id, onDelete) => {
  console.log(id)
  try {
      await productosApi.borrarProducto(id)
      message.success("Se borro el producto correctamente")
      onDelete?.()
  } catch (error) {
    message.error("Ocurrio un error al borrar el producto, intentelo mas tarde")
    console.log("Error de borrar producto", error)
  }

}


const DeleteProduct = ({id, onDelete}) => (
  <Popconfirm
    title="Borrar Producto"
    description="¿Estas seguro que deseas eliminar el producto?"
    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
    onConfirm={() => confirm(id, onDelete)}
  >
    <Button
    icon= {<DeleteOutlined  style={{ color: 'red'}}/>}
    ></Button>
  </Popconfirm>
);

export default DeleteProduct;