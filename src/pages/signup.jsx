import React, { useEffect, useState } from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from '../style'
import InputForm from '../components/layout/inputform'
import ButtonComponent from '../components/layout/button'
import { Image } from 'antd'
import loginImg from '../assets/images/login.png'
import { useNavigate } from "react-router-dom";
import {
  EyeFilled, 
  EyeInvisibleFilled}
from '@ant-design/icons'
import * as userService from '../services/userService'
import { useMutationHooks } from '../hooks/userMutationHook'
import Loading from '../components/layout/loading'
import * as message from '../components/layout/message'

export default function Signup() {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const mutation = useMutationHooks(
    data => userService.signupUser(data)
  ) 
  // console.log('mutation', mutation)
  const {data, isPending, isSuccess, isError} = mutation

  // Xử lý sau khi đăng ký thành công hoặc thất bại
  useEffect(() => {
    if(isSuccess) {
      message.success()
      handleNavigateLogin()

    } else if(isError) {
      message.error()
    }
  }, [isSuccess, isError])

  const handleOnchangeEmail = (value) => {
    setEmail(value)
  }

  const handleOnchangePassword = (value) => {
    setPassword(value)
  }

  const handleOnchangeConfirmPassword = (value) => {
    setConfirmPassword(value)
  }

  const hanldeSignUp = () => {
    mutation.mutate({email, password, confirmPassword})
    // console.log('sign-up', email, password, confirmPassword)
  }

  const navigate = useNavigate()
  const handleNavigateLogin = () => {
    navigate('/log-in')
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

          <div style={{position: 'relative', marginBottom: '1rem'}}>
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

          <div style={{position: 'relative'}}>
            <span
              onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
              style={{
                zIndex: 10,
                position: 'absolute',
                top: '0.4rem',
                right: '0.8rem'
              }}
            >
              {isShowConfirmPassword ? (<EyeFilled/>) : (<EyeInvisibleFilled/>)}
            </span>
            <InputForm 
              placeholder='confirm password' 
              type={isShowConfirmPassword ? 'text' : 'password'} 
              value={confirmPassword} 
              onChange={handleOnchangeConfirmPassword}
            />
          </div>

          {data?.status === 'ERR' && <span style={{color: 'red'}}>{data?.message}</span>}

          <Loading isPending={isPending}>
            <ButtonComponent
              disabled={!email.length || !password.length || !confirmPassword.length}
              onClick={hanldeSignUp}
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
              txtBtn={'Đăng ký'}
            ></ButtonComponent> 
          </Loading>

          <p style={{fontSize: '1.3rem'}}>Bạn đã có tài khoản? <WrapperTextLight onClick={handleNavigateLogin}>Đăng nhập</WrapperTextLight></p>

        </WrapperContainerLeft>

        <WrapperContainerRight className='d-flex flex-column justify-content-center align-items-center'>
          <Image src={loginImg} preview={false} alt='image-logo' height={200} width={200}/>
          <h4 className='text-white'>Mua sắm tại Nike</h4>
        </WrapperContainerRight>
      </div>
    </div>
  )
}
