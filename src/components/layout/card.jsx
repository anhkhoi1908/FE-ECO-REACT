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

export default function CardComponent() {
  return (
    <WrapperCardStyle
        hoverable
        cover={<img alt="example" src={ProductImg} />}
    >
        <StyleNameProduct>Air Jordan 1 Mid</StyleNameProduct>
        <WrapperReportText>
            <div>
                <span>4.96 <StarFilled style={{fontSize: '1.2rem', color: 'yellow'}}/></span>
                <WrapperStyleTextSell style={{fontSize: '1.1rem'}}> | Đã bán 1000+</WrapperStyleTextSell>
            </div>
        </WrapperReportText>
        <WrapperPriceText>1.000.000đ <WrapperDiscountText><span>-5%</span></WrapperDiscountText></WrapperPriceText>
    </WrapperCardStyle>
    
  )
}
