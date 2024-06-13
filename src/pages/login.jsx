import React from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from '../style'
import InputForm from '../components/layout/inputform'
import ButtonComponent from '../components/layout/button'
import { Image } from 'antd'
import loginImg from '../assets/images/login.png'


export default function Login() {
  return (
    <div className='d-flex justify-content-center align-items-center' style={{backgroundColor: '#ccc', height: '100vh'}}>
      <div style={{width: '80rem', height: '44.5rem', borderRadius: '1rem'}} className='bg-white d-flex'>
      <WrapperContainerLeft className='d-flex flex-column'>
        <h1>Xin chào</h1>
        <p>Đăng nhập và tạo tài khoản</p>
        <InputForm style={{marginBottom: '1rem'}} placeholder='abc@gmail.com'/>
        <InputForm placeholder='password'/>
        <ButtonComponent
          className='text-white'
          size={40} 
          icon={0}
          styleButton={{
              backgroundColor: 'rgb(255, 57, 69)', 
              height: '4.8rem', 
              width: '100%',
              fontSize: '1.5rem',
              fontWeight: '700',
              margin: '2.5rem 0 1rem'
          }}
          txtBtn={'Đăng nhập'}
        ></ButtonComponent> 
      <WrapperTextLight><p>Quên mật khẩu</p></WrapperTextLight>
      <p>Bạn chưa có tài khoản? <WrapperTextLight>Tạo tài khoản?</WrapperTextLight></p>
      </WrapperContainerLeft>
      <WrapperContainerRight className='d-flex flex-column justify-content-center align-items-center'>
        <Image src={loginImg} preview={false} alt='image-logo' height={200} width={200}/>
        <h4 className='text-white'>Mua sắm tại Nike</h4>
      </WrapperContainerRight>
    </div>
    </div>
  )
}
