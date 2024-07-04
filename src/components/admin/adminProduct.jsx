import React, { useEffect, useState } from 'react'
import { WrapperHeaderAdmin, WrapperUploadFile } from '../../style'
import { Button, Modal, Form, Upload, message} from 'antd'
import { PlusCircleFilled, DeleteOutlined, EditOutlined} from '@ant-design/icons'
import TableComponent from '../layout/table'
import InputComponent from '../layout/input'  
import { getBase64 } from '../../utils'
import * as productService from '../../services/productService'
import { useMutationHooks } from '../../hooks/userMutationHook'
import Loading from '../layout/loading'
import { isPending } from '@reduxjs/toolkit'
import { useQueries, useQuery } from '@tanstack/react-query'

export default function AdminPoroduct() {

  // Infor product neccessary
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [stateProduct, setStateProduct] = useState({
    name: '',
    price: '',
    description: '',
    rating: '',
    image: '',
    type: '',
    countInStock: ''
  })

  const[form] = Form.useForm()

  const mutation = useMutationHooks((data) => {
    const { name,
      price,
      description,
      rating,
      image,
      type,
      countInStock: countInStock} = data
    productService.createProduct({
      name,
      price,
      description,
      rating,
      image,
      type,
      countInStock
    })
  })

  const getAllProducts = async () => {
    const res = await productService.getAllProduct()
    return res
    // console.log('res', res)
  }

  const {data, isPending, isSuccess, isError} = mutation
  // console.log('data', data)
  const {isPending: isPendingProducts, data: products} = useQuery({queryKey: ['products'], queryFn:getAllProducts})
  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined style={{cursor: 'pointer', color: 'red', fontSize: '3rem'}}/>
        <EditOutlined style={{cursor: 'pointer', color: 'orange', fontSize: '3rem'}}/>
      </div>
    )
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: renderAction
    },
  ];

  const dataTable = products?.data?.length && products?.data?.map((product) => {
    return {...product, key: product._id}
  })
  
  // console.log('products', products)

  useEffect(() => {
    if(isSuccess && data?.status === 'OK') {
      message.success()
      handleCancel()
      setStateProduct()
    } else if (isError) {
      message.error()
    }
  }, [isSuccess])

  
  // Toggle open/close modal. If cancel close modal. Else if OK send data
  const handleCancel = () => {
    setIsModalOpen(false)
    setStateProduct({
      name: '',
      price: '',
      description: '',
      rating: '',
      image: '',
      type: '',
      countInStock: ''
    })
    form.resetFields()
  }

  console.log('stateProduct', stateProduct)
  
  // Submit send data: success & fail
  const onFinish = () => {
    mutation.mutate(stateProduct)
    // console.log('Success:', stateProduct);
  };
  // const onFinishFailed = (errorInfo) => {
    //   console.log('Failed:', errorInfo);
  // };
  
  // Get value input by onchange
  const handleOnchange = (e) => {
    // console.log('e.target.name', e.target.name, e.target.value)
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value
    })
  }

  // Choose image product use getBase64
  const handleOnchangeAvatar = async ({fileList}) => {
    const file = fileList[0]
    if(!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setStateProduct({
      ...stateProduct, 
      image: file.preview
    })
  }

  return (
    <div>
      <WrapperHeaderAdmin>Manage Products</WrapperHeaderAdmin>
      <div style={{marginTop: '1rem'}}>
        <Button onClick={() => setIsModalOpen(true)} style={{
            width: '15rem',   
            height: '15rem', 
            borderRadius: '1rem', 
            borderStyle: 'dashed'
          }}
        >
          <PlusCircleFilled style={{fontSize: '6rem'}}/>
        </Button>
      </div>

      <div style={{marginTop: '1.5rem'}}>
        <TableComponent data={dataTable} columns={columns}/>
      </div>

      <Modal 
        title="Create new product" 
        open={isModalOpen} 
        // onOk={handleOk} 
        onCancel={handleCancel}
        footer={null}
      >
        {/* <Loading isPending={isPending}> */}
          <Form
            name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Name"
              // name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input your Name!',
                },
              ]}
            >
              <InputComponent value={stateProduct.name} onChange={handleOnchange} name="name"/>
            </Form.Item>

            <Form.Item
              label="Type"
              name="type"
              rules={[
                {
                  required: true,
                  message: 'Please input your Type!',
                },
              ]}
            >
              <InputComponent value={stateProduct.type} onChange={handleOnchange} name="type"/>
            </Form.Item>

            <Form.Item
              label="Count InStock"
              name="countInStock"
              rules={[
                {
                  required: true,
                  message: 'Please input your InStock!',
                },
              ]}
            >
              <InputComponent value={stateProduct.countInStock} onChange={handleOnchange} name="countInStock"/>
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[
                {
                  required: true,
                  message: 'Please input your Price!',
                },
              ]}
            >
              <InputComponent value={stateProduct.price} onChange={handleOnchange} name="price"/>
            </Form.Item>

            <Form.Item
              label="Rating"
              name="rating"
              rules={[
                {
                  required: true,
                  message: 'Please input your Rating!',
                },
              ]}
            >
              <InputComponent value={stateProduct.rating} onChange={handleOnchange} name="rating"/>
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: 'Please input your Description!',
                },
              ]}
            >
              <InputComponent value={stateProduct.description} onChange={handleOnchange} name="description"/>
            </Form.Item>

            <Form.Item
              label="Image"
              name="image"
              rules={[
                {
                  required: true,
                  message: 'Please input your Image!',
                },
              ]}
            >
              <WrapperUploadFile onChange={handleOnchangeAvatar}>
                <Button>Select file</Button>
                {stateProduct?.image && (
                  <img src={stateProduct?.image} style={{
                    height: '6rem',
                    width: '6rem',
                    borderRadius: '50%',
                    marginLeft: '1rem',
                    objectFit: 'cover'
                  }}/>
                )}
              </WrapperUploadFile>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 20,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        {/* </Loading> */}
      </Modal>
    </div>
  )
}
