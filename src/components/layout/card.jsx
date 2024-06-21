import React from 'react'
import { 
    StyleNameProduct, 
    WrapperReportText,
    WrapperPriceText, 
    WrapperDiscountText,
    WrapperCardStyle,
    WrapperStyleTextSell,
} 
from '../../style'
import ProductImg from '../../assets/images/product1.png'
import StarFilled from '@ant-design/icons'

export default function CardComponent(props) {
    const {countInStock, description, image, name, rating, price, type, sold, discount} = props

    return (
        <WrapperCardStyle
            hoverable
            cover={<img alt="example" src={ProductImg} />}
        >
            <StyleNameProduct>{name}</StyleNameProduct>
            <WrapperReportText>
                <div>
                    <span>{rating} <StarFilled style={{fontSize: '1.2rem', color: 'yellow'}}/></span>
                    <WrapperStyleTextSell style={{fontSize: '1.1rem'}}> | Đã bán {sold || 1000}+</WrapperStyleTextSell>
                </div>
            </WrapperReportText>
            <WrapperPriceText>{price} <WrapperDiscountText><span>{discount || 5}%</span></WrapperDiscountText></WrapperPriceText>
        </WrapperCardStyle>
        
    )
}
