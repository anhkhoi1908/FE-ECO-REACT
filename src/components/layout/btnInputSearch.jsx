import React from "react";
import { Input, Button } from "antd";
import {SearchOutlined} from '@ant-design/icons'
import InputComponent from "./input";
import ButtonComponent from "./button";

const BtnInputSearch = (props) => {
    const {size, placeholder, txtBtn, bordered='0', bgInput, padding, bgBtn} = props
    return (
        <div className="d-flex" style={{position: 'relative'}}>
            <InputComponent 
                size={size} 
                placeholder={placeholder} 
                styleInput={{backgroundColor: bgInput, borderRadius: bordered, padding: padding}}/>
            <SearchOutlined style={{position: 'absolute', top: '50%', left: 10, transform: 'translate(50%, -50%)'}}/>
        </div>
    )
}

export default BtnInputSearch