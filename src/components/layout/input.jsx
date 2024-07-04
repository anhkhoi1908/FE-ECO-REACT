import React from 'react';
import {Input} from 'antd';

export default function InputComponent ({size, placeholder, bgInput, styleInput, ...rests}) {
    return (
        <div className=''>
            <Input 
                size={size} 
                placeholder={placeholder} 
                style={styleInput}
                {...rests}/>
        </div>
    );
};

