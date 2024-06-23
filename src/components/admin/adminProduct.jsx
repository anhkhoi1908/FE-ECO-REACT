import React from 'react'
import { WrapperHeaderAdmin } from '../../style'
import { Button } from 'antd'
import { PlusCircleFilled} from '@ant-design/icons'
import TableComponent from '../layout/table'

export default function AdminPoroduct() {
  return (
    <div>
      <WrapperHeaderAdmin>Manage Products</WrapperHeaderAdmin>
      <div style={{marginTop: '1rem'}}>
        <Button style={{
            width: '15rem',   
            height: '15rem', 
            borderRadius: '1rem', 
            borderStyle: 'dashed'
          }}
        >
          <PlusCircleFilled style={{fontSize: '6rem'}}/>
        </Button>
      </div>
      <div style={{marginTop: '1.5rem'}}>
        <TableComponent/>
      </div>
    </div>
  )
}
