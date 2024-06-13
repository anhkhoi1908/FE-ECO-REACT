import React, { useState } from 'react'
import { Input } from 'antd'
import { WrapperInputStyle } from '../../style'

export default function InputForm(props) {
    const [valueInput, setValueInput] = useState('')
    const {placeholder = 'Nhập text', ...rests} = props
    return (
        <div>
            <WrapperInputStyle placeholder={placeholder} valueInput={valueInput} {...rests}></WrapperInputStyle>
        </div>
    )
}
