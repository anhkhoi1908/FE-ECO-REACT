import React from 'react'
import NavbarComponent from '../components/layout/navbar'
import CardComponent from '../components/layout/card'
import { Col, Row } from 'antd'

export default function TypeProductPage() {
  return (
    <Row style={{padding: '0 120px', backgroundColor: '#efefef'}}>
        <Col span={4} style={{backgroundColor: '#fff'}}>
            <NavbarComponent/>    
        </Col>
        <Col span={20}>
            <CardComponent/>
        </Col>
    </Row>
  )
}
