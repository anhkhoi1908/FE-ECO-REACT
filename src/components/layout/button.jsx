import React from 'react';
import { Button } from 'antd';
import {
    SearchOutlined}
from '@ant-design/icons'

const ButtonComponent = ({size, styleButton, txtBtn, ...rest}) => {
    return (
        <div>
            <Button 
                size={size} 
                icon={<SearchOutlined/>} 
                style={styleButton}
                {...rest}
            >
                {txtBtn}
            </Button>
        </div>
    );
};

export default ButtonComponent;