import { Radio, Divider, Table, Dropdown, Space } from 'antd';
import React, { useState } from 'react'

export default function TableComponent(props) {
    const {selectionType = 'checkbox', data = [], columns = [], handleDeletedMany} = props
    const [rowSelectedKey, setRowSelectedKey] = useState([])
    // const [selectionType, setSelectionType] = useState('checkbox')

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
        //   console.log(`selectedRowKeys: ${selectedRowKeys}`);
        setRowSelectedKey(selectedRowKeys)
        },
        // getCheckboxProps: (record) => ({
        //   disabled: record.name === 'Disabled User', // Column configuration not to be checked
        //   name: record.name,
        // }),
    };

    // const items = [
    //     {
    //       label: (
    //         <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
    //           1st menu item
    //         </a>
    //       ),
    //       key: '0',
    //     },
    //     {
    //       label: (
    //         <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
    //           2nd menu item
    //         </a>
    //       ),
    //       key: '1',
    //     },
    //     {
    //       type: 'divider',
    //     },
    //     {
    //       label: '3rd menu item（disabled）',
    //       key: '3',
    //       disabled: true,
    //     },
    //   ];
 
    const handleDeleteAll = () => {
        handleDeletedMany(rowSelectedKey)
    }

    return (
        <div>
            {rowSelectedKey.length > 0 && (
                <div style={{backgroundColor: '#000', color: '#fff', fontWeight: 'bold', padding: '1rem', cursor: 'pointer'}}
                    onClick={handleDeleteAll}
                >
                    Delete All
                </div>
            )}
            <Table
                rowSelection={{
                type: selectionType,
                ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
                {...props}
            />
        </div>
    )
}
