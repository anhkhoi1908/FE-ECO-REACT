import React, { useState } from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from '../style'
import InputForm from '../components/layout/inputform'
import ButtonComponent from '../components/layout/button'
import { Image } from 'antd'
import loginImg from '../assets/images/login.png'
import { useNavigate } from 'react-router-dom'
import {
  EyeFilled, 
  EyeInvisibleFilled}
from '@ant-design/icons'
import * as userService from '../services/userService'
import { useMutationHooks } from '../hooks/userMutationHook'
import Loading from '../components/layout/loading'


export default function Login() {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const mutation = useMutationHooks(
    data => userService.loginUser(data)
  ) 
  // console.log('mutation', mutation)
  const {data, isPending} = mutation

  const handleOnchangeEmail = (value) => {
    setEmail(value)
  }

  const handleOnchangePassword = (value) => {
    setPassword(value)
  }

  const handleLogin = () => {
    mutation.mutate({
      email, password
    })
    // console.log('log-in', email, password)
  }

  const navigate = useNavigate()
  const handleNavigateSignUp = () => {
    navigate('/sign-up')
  }

  return (
    <div className='d-flex justify-content-center align-items-center' style={{backgroundColor: '#ccc', height: '100vh'}}>
      <div style={{width: '80rem', height: '44.5rem', borderRadius: '1rem'}} className='bg-white d-flex'>
        <WrapperContainerLeft className='d-flex flex-column'>
          <h1>Xin chào</h1>
          <p>Đăng nhập và tạo tài khoản</p>

          <InputForm 
            style={{marginBottom: '1rem'}} 
            placeholder='abc@gmail.com' 
            value={email} 
            onChange={handleOnchangeEmail}
          />

          <div style={{position: 'relative'}}>
            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              style={{
                zIndex: 10,
                position: 'absolute',
                top: '0.4rem',
                right: '0.8rem'
              }}
            >
              {isShowPassword ? (<EyeFilled/>) : (<EyeInvisibleFilled/>)}
            </span>
            <InputForm 
              placeholder='password' 
              type={isShowPassword ? 'text' : 'password'} 
              value={password} 
              onChange={handleOnchangePassword}
            />
          </div>

          {data?.status === 'ERR' && <span style={{color: 'red'}}>{data?.message}</span>}

          <Loading isPending={isPending}>
            <ButtonComponent
              disabled={!email.length || !password.length}
              onClick={handleLogin}
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
          </Loading>

          <WrapperTextLight><p>Quên mật khẩu</p></WrapperTextLight>
          <p style={{fontSize: '1.3rem'}}>Bạn chưa có tài khoản? <WrapperTextLight onClick={handleNavigateSignUp}>Tạo tài khoản?</WrapperTextLight></p>
        </WrapperContainerLeft>

        <WrapperContainerRight className='d-flex flex-column justify-content-center align-items-center'>
          <Image src={loginImg} preview={false} alt='image-logo' height={200} width={200}/>
          <h4 className='text-white'>Mua sắm tại Nike</h4>
        </WrapperContainerRight>
      </div>
    </div>
  )
}
