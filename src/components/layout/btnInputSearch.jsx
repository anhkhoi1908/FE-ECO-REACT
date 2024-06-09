import React from "react";
import { Input, Button } from "antd";
import {SearchOutlined} from '@ant-design/icons'
import InputComponent from "./input";
import ButtonComponent from "./button";

const BtnInputSearch = (props) => {
    const {size, placeholder, txtBtn, bordered='0', bgInput, bgBtn} = props
    return (
        <div className="d-flex rounded">
            <InputComponent 
                size={size} 
                placeholder={placeholder} 
                styleInput={{backgroundColor: bgInput}}/>
            <ButtonComponent
                size={size} 
                icon={<SearchOutlined/>} 
                styleButton={{backgroundColor: bgBtn}}
                txtBtn={txtBtn}/>
        </div>
    )
}

export default BtnInputSearch