import React, { useState } from 'react'
import {WrapperContentProfile, WrapperHeader, WrapperLabel, WrapperInput} from '../style'
import InputForm from '../components/layout/inputform'
import ButtonComponent from '../components/layout/button'

export default function Profile() {
  const [email, setEmail] = useState('')
  
  const handleOnchangeEmail = () => {

  }

  const handleUpdate = () => {}


  return (
    <div style={{padding: '0 4rem', height: '50rem'}}>
      <WrapperHeader>User Information</WrapperHeader>
      <WrapperContentProfile>
        <WrapperInput>
          <WrapperLabel htmlFor='email'>Email</WrapperLabel>
          <InputForm id='email' style={{width: '30rem', outline: 'none'}}
            value={email} 
            onChange={handleOnchangeEmail}
          />
          <ButtonComponent
            onClick={handleUpdate}
            icon={0}
            size={40} 
            styleButton={{
              height: '3rem', 
              width: 'fit-content',
              borderRadius: '0.4rem',
              fontSize: '1.5rem',
              fontWeight: '700',
              padding: '0.2rem 0.6rem 0.6rem'
            }}
              txtBtn={'Update'}
          ></ButtonComponent> 
        </WrapperInput>
        <WrapperInput>
          <WrapperLabel htmlFor='email'>Email</WrapperLabel>
          <InputForm id='email' style={{width: '30rem', outline: 'none'}}
            value={email} 
            onChange={handleOnchangeEmail}
          />
          <ButtonComponent
            onClick={handleUpdate}
            icon={0}
            size={40} 
            styleButton={{
              height: '3rem', 
              width: 'fit-content',
              borderRadius: '0.4rem',
              fontSize: '1.5rem',
              fontWeight: '700',
              padding: '0.2rem 0.6rem 0.6rem'
            }}
              txtBtn={'Update'}
          ></ButtonComponent> 
        </WrapperInput>
        <WrapperInput>
          <WrapperLabel htmlFor='email'>Email</WrapperLabel>
          <InputForm id='email' style={{width: '30rem', outline: 'none'}}
            value={email} 
            onChange={handleOnchangeEmail}
          />
          <ButtonComponent
            onClick={handleUpdate}
            icon={0}
            size={40} 
            styleButton={{
              height: '3rem', 
              width: 'fit-content',
              borderRadius: '0.4rem',
              fontSize: '1.5rem',
              fontWeight: '700',
              padding: '0.2rem 0.6rem 0.6rem'
            }}
              txtBtn={'Update'}
          ></ButtonComponent> 
        </WrapperInput>
      </WrapperContentProfile>
    </div>
  )
}
