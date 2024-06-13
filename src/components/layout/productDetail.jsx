import React from 'react'
import { Row, Col, Image, InputNumber } from 'antd'
import imgProduct from '../../assets/images/slide1.jpg'
import imgProductSmall from '../../assets/images/logo.png'
import { 
    WrapperPriceProduct,
    WrapperStyleColImage, 
    WrapperStyleImageSmall, 
    WrapperStyleNameProduct, 
    WrapperStyleTextSell, 
    WrapperPriceTextProduct,
    WrapperAddressProduct,
    WrapperQualityProduct,
    WrapperBtnQualityProduct
} from '../../style'
import {StarFilled, PlusOutlined, MinusOutlined} from '@ant-design/icons'
import ButtonComponent from './button'
import ProductImg from '../../assets/images/product1.png'
import ProSmImg1 from '../../assets/images/prosm1.png'
import ProSmImg2 from '../../assets/images/prosm2.png'
import ProSmImg3 from '../../assets/images/prosm3.png'
import ProSmImg4 from '../../assets/images/prosm4.jpg'
import ProSmImg5 from '../../assets/images/prosm5.png'
import ProSmImg6 from '../../assets/images/prosm6.jpg'

export default function ProductDetailComponent() {
    const onChange = () => {

    }
    return (
        <div style={{paddingTop: '4rem'}}>
        <Row className='bg-white' style={{padding: '1.6rem', borderRadius: '1rem'}}>
            <Col span={10} style={{borderRight: '0.1rem solid #e5e5e5', paddingRight: '1rem'}}>
                <Image src={ProductImg} alt='image product' preview={true} style={{borderRadius: '1rem'}}/>
                <Row className='justify-content-between' style={{padding: '1rem 0'}}>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={ProSmImg1} alt='img small' preview={true}/>
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={ProSmImg2} alt='img small' preview={true}/>
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={ProSmImg3} alt='img small' preview={true}/>
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={ProSmImg4} alt='img small' preview={true}/>
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={ProSmImg5} alt='img small' preview={true}/>
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={ProSmImg6} alt='img small' preview={true}/>
                    </WrapperStyleColImage>
                </Row>
            </Col>
            <Col span={14} style={{paddingLeft: '1rem'}}>
                <WrapperStyleNameProduct>Air Jordan 1 Mid</WrapperStyleNameProduct>
                <div>
                    <StarFilled style={{fontSize: '1.2rem', color: 'yellow'}}/>
                    <StarFilled style={{fontSize: '1.2rem', color: 'yellow'}}/>
                    <StarFilled style={{fontSize: '1.2rem', color: 'yellow'}}/>
                    <StarFilled style={{fontSize: '1.2rem', color: 'yellow'}}/>
                    <StarFilled style={{fontSize: '1.2rem', color: 'yellow'}}/>
                    <WrapperStyleTextSell> | Đã bán 1000+</WrapperStyleTextSell>
                </div>
                <WrapperPriceProduct><WrapperPriceTextProduct>5.000.000đ</WrapperPriceTextProduct></WrapperPriceProduct>
                <WrapperAddressProduct>
                    <span>Giao đến </span>
                    <span className='address'>Q.1, P.Bến Nghé, Hồ Chí Minh </span>
                    <span className='change-address'>- Đổi địa chỉ</span>
                </WrapperAddressProduct>
                <div style={{margin: '1rem 0 2rem', padding: '1rem 0', borderBottom: '0.1rem solid #e5e5e5', borderTop: '0.1rem solid #e5e5e5'}}>
                    <div style={{marginBottom: '1rem'}}>Số lượng</div>
                    <WrapperQualityProduct>
                        <button className='bg-transparent' style={{border: 'none'}}>
                            <MinusOutlined style={{color: '#000', fontSize: '2rem'}} size={10}/>    
                        </button>
                        <InputNumber defaultValue={1} onChange={onChange} size='small'/>
                        <button className='bg-transparent' style={{border: 'none'}}>
                            <PlusOutlined style={{color: '#000', fontSize: '2rem'}} size={10}/> 
                        </button>
                    </WrapperQualityProduct>
                </div>
                <div className='d-flex'>
                    <ButtonComponent
                        className='text-white'
                        size={40} 
                        icon={0}
                        styleButton={{
                            backgroundColor: 'rgb(255, 57, 69)', 
                            height: '4.8rem', 
                            width: '22rem',
                            fontSize: '1.5rem',
                            fontWeight: '700'
                        }}
                        txtBtn={'Chọn mua'}/>
                    <ButtonComponent
                        size={40} 
                        icon={0}
                        styleButton={{
                            backgroundColor: '#fff', 
                            height: '4.8rem', 
                            width: '22rem',
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            border: '0.1rem solid rgb(255, 57, 69)',
                            color: 'rgb(255, 57, 69)'
                        }}
                        txtBtn={'Mua trả sau'}/>
                </div>
            </Col>
        </Row>
        </div>
    )
}
