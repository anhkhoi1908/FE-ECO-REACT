import React, { useEffect, useState } from 'react'
import {WrapperContentProfile, WrapperHeader, WrapperLabel, WrapperInput, WrapperUpgrade, WrapperUploadFile} from '../style'
import InputForm from '../components/layout/inputform'
import ButtonComponent from '../components/layout/button'
import { useDispatch, useSelector } from 'react-redux'
import * as userService from '../services/userService'
import * as message from '../components/layout/message'
import { useMutationHooks } from '../hooks/userMutationHook'
import { updateUser } from '../redux/slice/userSlide'
import { Button, Upload } from 'antd'
import {UploadOutlined} from '@ant-design/icons'
import { getBase64 } from '../utils'

export default function Profile() {
  const user = useSelector((state) => state.user)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [avatar, setAvatar] = useState('')

  const mutation = useMutationHooks(
    (data) => {
      const {id, ...rests} = data
      userService.updateUser(id, rests)
    }
  ) 
  const dispatch = useDispatch()
  // console.log('mutation', mutation)
  const {data, isPending, isSuccess, isError} = mutation
  // console.log('data', data)

  useEffect(() => {
    setName(user?.name)
    setEmail(user?.email)
    setPhone(user?.phone)
    setAddress(user?.address)
    setAvatar(user?.avatar)
  }, [user])

  useEffect(() => {
    if(isSuccess) {
      message.success()
      handleGetDetailUser(user?.id, user?.access_token)
    } else if(isError) {
      message.error()
    }
  }, [isSuccess, isError])

  const handleGetDetailUser = async (id, token) => {
    const res = await userService.getDetailUser(id, token)
    dispatch(updateUser({...res?.data, access_token: token}))
    // console.log('res', res)
  }
  
  const handleOnchangeName = (value) => {
    setName(value)
  }

  const handleOnchangeAddress = (value) => {
    setAddress(value)
  }

  const handleOnchangePhone = (value) => {
    setPhone(value)
  }

  const handleOnchangeEmail = (value) => {
    setEmail(value)
  }

  const handleOnchangePassword = (value) => {
    setPassword(value)
  }

  const handleOnchangeAvatar = async ({fileList}) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setAvatar(file.preview)
  }

  const handleUpdate = () => {
    // console.log('update', name, email)
    // userService(user?.id, {name, email})
    mutation.mutate({id: user?.id, name, email})
  }


  return (
    <div style={{padding: '0 4rem', height: '50rem'}}>
      <WrapperHeader>User Information</WrapperHeader>
      <WrapperContentProfile>
        <WrapperInput>
          <WrapperLabel htmlFor='name'>Name</WrapperLabel>
          <WrapperUpgrade>
            <InputForm id='name' style={{width: '40rem', outline: 'none', marginRight: '1rem'}}
              value={name} 
              onChange={handleOnchangeName}
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

          </WrapperUpgrade>
        </WrapperInput>

        <WrapperInput>
          <WrapperLabel htmlFor='email'>Email</WrapperLabel>
          <WrapperUpgrade>
            <InputForm id='email' style={{width: '40rem', outline: 'none', marginRight: '1rem'}}
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
          </WrapperUpgrade>
        </WrapperInput>

        <WrapperInput>
          <WrapperLabel htmlFor='phone'>Phone</WrapperLabel>
          <WrapperUpgrade>
            <InputForm id='phone' style={{width: '40rem', outline: 'none', marginRight: '1rem'}}
              value={phone} 
              onChange={handleOnchangePhone}
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
          </WrapperUpgrade>
        </WrapperInput>

        <WrapperInput>
          <WrapperLabel htmlFor='address'>Address</WrapperLabel>
          <WrapperUpgrade>
            <InputForm id='address' style={{width: '40rem', outline: 'none', marginRight: '1rem'}}
              value={address} 
              onChange={handleOnchangeAddress}
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
          </WrapperUpgrade>
        </WrapperInput>

        <WrapperInput>
          <WrapperLabel htmlFor='avatar'>Avatar</WrapperLabel>
          {/* <WrapperUpgrade> */}
            {/* <InputForm id='avatar' style={{width: '40rem', outline: 'none', marginRight: '1rem'}}
              value={avatar} 
              onChange={handleOnchangePhone}
            /> */}
            <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
              <Button icon={<UploadOutlined/>}>Select File</Button>
            </WrapperUploadFile>
            {avatar && (
              <img src={avatar} style={{
                height: '6.4rem',
                width: '6.4rem',
                borderRadius: '50%',
                objectFit: 'cover'
              }} alt='avatar'/>
            )}
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
          {/* </WrapperUpgrade> */}
        </WrapperInput>

      </WrapperContentProfile>
    </div>
  )
}
