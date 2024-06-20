import React from 'react'
import NavbarComponent from '../components/layout/navbar'
import CardComponent from '../components/layout/card'
import { Col, Row, Pagination } from 'antd'
import { WrapperNavbar, WrapperProducts } from '../style'

export default function TypeProductPage() {
  const onChange = () => {

  }
  return (
    <div style={{padding: '0 4rem', backgroundColor: '#efefef'}}>
      <Row className='pt-4' style={{flexWrap: 'nowrap'}}>
          <WrapperNavbar span={4}>
              <NavbarComponent/>    
          </WrapperNavbar>
          <Col span={20}>
            <WrapperProducts span={20}>
                <CardComponent/>
                <CardComponent/>
                <CardComponent/>
                <CardComponent/>
                <CardComponent/>
                <CardComponent/>
                <CardComponent/>
            </WrapperProducts>
            <Pagination showQuickJumper defaultCurrent={2} total={100} onChange={onChange}  className='text-center' style={{margin: '4rem 0'}}/> 
          </Col>
      </Row>
    </div>
  )
}
