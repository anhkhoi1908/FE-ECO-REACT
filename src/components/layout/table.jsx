import { Radio, Divider, Table } from 'antd';
import React, { useState } from 'react'

export default function TableComponent(props) {
    const {selectionType = 'checkbox', data = [], columns = []} = props
    // const [selectionType, setSelectionType] = useState('checkbox')

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
          disabled: record.name === 'Disabled User', // Column configuration not to be checked
          name: record.name,
        }),
    };

    return (
        <div>
            <Table
                rowSelection={{
                type: selectionType,
                ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
            />
        </div>
    )
}
