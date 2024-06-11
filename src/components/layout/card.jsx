import React from 'react'
import { 
    StyleNameProduct, 
    WrapperReportText,
    WrapperPriceText, 
    WrapperDiscountText,
    WrapperCardStyle
} 
from '../../style'
import {StarFilled} from '@ant-design/icons'

export default function CardComponent() {
  return (
    <WrapperCardStyle
        hoverable
        style={{ width:200}}
        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
    >
        <StyleNameProduct>Iphone 15 ProMax</StyleNameProduct>
        <WrapperReportText>
            <div>
                <span>4.96 <StarFilled style={{fontSize: '1.2rem', color: 'yellow'}}/></span>
                <span> | Đã bán 1000+</span>
            </div>
        </WrapperReportText>
        <WrapperPriceText>1.000.000đ <WrapperDiscountText><span>-5%</span></WrapperDiscountText></WrapperPriceText>
    </WrapperCardStyle>
    
  )
}
