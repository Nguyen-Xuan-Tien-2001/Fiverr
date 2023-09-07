import React from 'react';
import { Table } from 'antd';



const TableCustom = ({columns, data}) => {
    return (
        <>
            <Table columns={columns} dataSource={data} />
        </>
    )
};
export default TableCustom;