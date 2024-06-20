import React from 'react'
import { Carousel } from 'antd';

export default function CarouselComponent() {
  const contentStyle = {
    height: '8rem',
    color: '#000',
    lineHeight: '1rem',
    alignContent: 'center',
    textAlign: 'center',
    background: '#f5f5f5',
    marginBottom: 0,
  };
  return (
    <div>
      <Carousel autoplay>
        <div>
          <div style={contentStyle}>
            <h3 style={{fontSize: '1.6rem', fontWeight: 500}}>Move, Shop, Customise & Celebrate With Us.</h3>
            <p style={{fontSize: '1.2rem', fontWeight: '500'}}>No matter what you feel like doing today, It’s better as a Member.</p>
            <p style={{fontSize: '1.2rem', fontWeight: '700', textDecoration: 'underline'}}>Join Us</p>
          </div>
        </div>
        <div>
        <div style={contentStyle}>
            <h3 style={{fontSize: '1.6rem', fontWeight: 500}}>New Styles on Sale: Up to 40% Off</h3>
            <p style={{fontSize: '1.2rem', fontWeight: '700', textDecoration: 'underline'}}>Shop All Our New Markdowns</p>
          </div>
        </div>
        <div>
        <div style={contentStyle}>
            <h3 style={{fontSize: '1.6rem', fontWeight: 500}}>Free Delivery</h3>
            <p style={{fontSize: '1.2rem', fontWeight: '500'}}>Applies to orders of 5.000.000₫ or more. <span style={{fontWeight: 700, textDecoration: 'underline'}}>View details</span></p>
          </div>
        </div>
        

      </Carousel>
    </div>
  ) 
}
