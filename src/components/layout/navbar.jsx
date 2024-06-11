import React from 'react'
import { WrapperContent, WrapperLabelText, WrapperTextValue } from '../../style'
import { Checkbox, Rate } from 'antd'

export default function NavbarComponent() {
    const onChange = () => {

    }
    const renderContent = (type, options) => {
        switch(type) {
            case 'text':
                return options.map((option) => {
                    return <WrapperTextValue>{option}</WrapperTextValue>
                })
            case 'checkbox':
                return <Checkbox.Group style={{ width: '100%' }} onChange={onChange} className='d-flex flex-column'>
                    {options.map((option) => {
                        return (
                            <Checkbox value={option.value}>{option.label}</Checkbox>
                        )
                    })}
              </Checkbox.Group>
            case 'star':
                return options.map((option) => {
                    return (
                        <div className='d-flex'>
                            <Rate style={{fontSize: '1.2rem'}} disabled defaultValue={option}/>
                            <span style={{fontSize: '1.2rem'}}>{`từ ${option} sao`}</span>
                        </div>
                    )
                })     
            case 'price':
                return options.map((option) => {
                    return (
                        <div style={{borderRadius: '1rem', backgroundColor: '#efefef', width: 'fit-content', padding: '0.5rem'}}>{option}</div>
                    )
                })     
            default: 
                return {}
        }
    }
    return (
        <div style={{backgroundColor: '#fff', padding: '1rem'}}>
            <WrapperLabelText>Label</WrapperLabelText>
            <WrapperContent>
                {renderContent('text', ['Tủ Lạnh', 'TV', 'Máy Giặt'])}  
                {renderContent('checkbox', [
                    { value: 'a', label: 'A'},
                    { value: 'b', label: 'B'},
                ])}  
            </WrapperContent>
            <WrapperContent>
                {renderContent('star', [3, 4, 5])}   
            </WrapperContent>
            <WrapperContent>
                {renderContent('price', ['dưới 500.000', 'Trên 1.000.000'])}   
            </WrapperContent>
        </div>
  )
}
