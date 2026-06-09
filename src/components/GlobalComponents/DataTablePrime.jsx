import React from "react";
import DataTable from "react-data-table-component";
import { useState } from "react";

const tableCustomStyles = {
    header: {
        style: {
            backgroundColor: '#1E40AF',
            color: '#FFFFFF',
            fontWeight: 'bold',
            fontSize: '14px',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '20px',
            paddingLeft: '16px',
            paddingRight: '16px',
        },
    },
    headRow: {
        style: {
            minHeight: '35px',
            padding: '0px'
        }
    },
    headCells: {
        style: {
            backgroundColor: '#F0F9FF',
            color: '#1E40AF',
            fontSize: '11px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            justifyContent: 'center',
            borderBottom: '1px solid #E5E7EB',

        },
    },
    cells: {
        style: {
            justifyContent: 'center',
            fontSize: '14px',
            color: '#374151',
        },
    },
    rows: {
        style: {
            minHeight: '52px',
            '&:nth-of-type(odd)': {
                backgroundColor: '#FFFFFF',
            },
            '&:nth-of-type(even)': {
                backgroundColor: '#F8FAFC',
            },
            borderBottomStyle: 'solid',
            borderBottomWidth: '1px',
            borderBottomColor: '#F1F5F9',
        },
        highlightOnHoverStyle: {
            backgroundColor: '#E2E8F0',
            borderBottomColor: '#E2E8F0',
            borderRadius: '0px',
            outline: '1px solid #FFFFFF',
        },
    },
    pagination: {
        style: {
            borderTop: 'none',
            fontSize: '13px',
            color: '#1E40AF',
            fontWeight: 'bold',
        },
    },
};

const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
};

export default function DataTablePrime({ data, columns, title }) {
    const [busqueda, setBusqueda] = useState('')

    const columnsConResponsive = columns.map(col => ({
        ...col,
        style: {
            ...col.style,
            whiteSpace: 'normal',
            wordWrap: 'break-word',
        },
    }))

    const dataFiltrada = data.filter(item => {
        const nombre = item.nombre ? item.nombre.toLowerCase() : ''
        const codigo = item.codigoBarras ? item.codigoBarras.toLowerCase() : ''
        const sku = item.sku ? item.sku.toLowerCase() : ''
        const busca = busqueda.toLowerCase()
        
        return nombre.includes(busca) || codigo.includes(busca) || sku.includes(busca)
    })


    return (
        <div className="rounded-xl shadow-lg border border-gray-200 overflow-hidden bg-white m-4">
            <div className="flex justify-end p-4 border-b border-gray-100 ">
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={busqueda}
                    onChange={e => setBusqueda(e.target.value)}
                    className="start-left w-50 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
            <DataTable
                title={title}
                columns={columnsConResponsive}
                data={dataFiltrada}
                customStyles={tableCustomStyles}
                pagination
                paginationComponentOptions={paginationComponentOptions}
                responsive={true}
                responsiveLayout="scroll"
                highlightOnHover
                noDataComponent={
                    <div className="p-8 text-gray-500">No hay registros para mostrar</div>
                }
            />
        </div>
    );
}