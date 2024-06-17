import React, { useState } from 'react'
import { Input } from 'antd'
import { WrapperInputStyle } from '../../style'

export default function InputForm(props) {
    // const [valueInput, setValueInput] = useState('')

    const {placeholder = 'Nhập text', ...rests} = props
    const handleOnchangeInput = (e) => {
        props.onChange(e.target.value)
        // console.log('e', e.target.value)
    }

    return (
        <div>
            <WrapperInputStyle placeholder={placeholder} value={props.value} {...rests} onChange={handleOnchangeInput}/>
        </div>
    )
}
