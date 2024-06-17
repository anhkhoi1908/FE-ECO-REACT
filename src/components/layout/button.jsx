import React from 'react';
import { Button } from 'antd';
import {
    SearchOutlined}
from '@ant-design/icons'

const ButtonComponent = ({size, styleButton, txtBtn, disabled, ...rest}) => {
    return (
        <div>
            <Button 
                size={size} 
                icon={<SearchOutlined/>} 
                style={{
                    ...styleButton,
                    background: disabled ? '#ccc' : styleButton.backgroundColor
                }}
                {...rest}
            >
                {txtBtn}
            </Button>
        </div>
    );
};

export default ButtonComponent;