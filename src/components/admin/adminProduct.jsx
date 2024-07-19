import React, { useEffect, useRef, useState } from 'react'
import { WrapperHeaderAdmin, WrapperUploadFile } from '../../style'
import { Button, Modal, Form, Upload, Space} from 'antd'
import { PlusCircleFilled, DeleteOutlined, EditOutlined, SearchOutlined} from '@ant-design/icons'
import TableComponent from '../layout/table'
import InputComponent from '../layout/input'  
import { getBase64 } from '../../utils'
import * as productService from '../../services/productService'
import { useMutationHooks } from '../../hooks/userMutationHook'
import Loading from '../layout/loading'
import { isPending } from '@reduxjs/toolkit'
import { useQueries, useQuery } from '@tanstack/react-query'
import DrawerComponent from '../layout/drawerComponent'
import { render } from '@testing-library/react'
import ModalComponent from '../layout/modalComponent'
import { useSelector } from 'react-redux'
import * as message from '../../components/layout/message'


export default function AdminPoroduct() {
  // Infor product neccessary
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [rowSelected, setRowSelected] = useState('')
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const user = useSelector((state) => state?.user)
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [stateProduct, setStateProduct] = useState({
    name: '',
    price: '',
    description: '',
    rating: '',
    image: '',
    type: '',
    countInStock: ''
  })

  const [stateProductDetails, setStateProductDetails] = useState({
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
      countInStock} = data
    const res = productService.createProduct({
      name,
      price,
      description,
      rating,
      image,
      type,
      countInStock
    })  
    return res
  })

  const mutationDeleted = useMutationHooks(
    (data) => {
      const {
        id, 
        token, 
      } = data
      const res = productService.deleteProduct(id, token)
      return res
    }
  )

  const mutationDeletedMany = useMutationHooks(
    (data) => {
      const {
        token, ...ids
      } = data
      const res = productService.deleteManyProduct(ids, token)
      return res
    }
  )

  const getAllProducts = async () => {
    const res = await productService.getAllProduct()
    return res
    // console.log('res', res)
  }

  const fetchGetDetailsProduct = async (rowSelected) => {
    const res = await productService.getDetailsProduct(rowSelected)
    if(res?.data) {
      setStateProductDetails({
        name: res?.data?.name,
        price: res?.data?.price,
        description: res?.data?.description,
        rating: res?.data?.rating,
        image: res?.data?.image,
        type: res?.data?.type,
        countInStock: res?.data?.countInStock
      })
    }
  }

  useEffect(() => {
    form.setFieldsValue(stateProductDetails)
  }, [form, setStateProductDetails])

  useEffect(() => {
    if(rowSelected && isOpenDrawer) {
      fetchGetDetailsProduct(rowSelected)
    }
  }, [rowSelected, isOpenDrawer])
  // console.log('StateProduct', stateProductDetails)

  const handleDetailsProduct = () => {
    setIsOpenDrawer(true)
    // console.log('rowSelected', rowSelected)
  }

  const handleDeletedManyProduct = (ids) => {
    mutationDeletedMany.mutate({ids: ids, token: user?.access_token}, {
      onSettled: () => {
        queryProduct.refetch()
      } 
    })
  }

  const {data, isPending, isSuccess, isError} = mutation
  const {data: dataDeleted, isPending: isPendingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted} = mutationDeleted
  const {data: dataDeletedMany, isPending: isPendingDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany} = mutationDeletedMany

  // console.log('data', data)
  const queryProduct = useQuery({queryKey: ['products'], queryFn:getAllProducts})
  const {isPending: isPendingProducts, data: products} = queryProduct
  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined style={{cursor: 'pointer', color: 'red', fontSize: '3rem'}} onClick={() => setIsModalOpenDelete(true)}/>
        <EditOutlined style={{cursor: 'pointer', color: 'orange', fontSize: '3rem'}} onClick={handleDetailsProduct}/>
        {/* onClick={handleDetailProduct} */}
      </div>
    )
  }

  // const renderImage = () => {
  //   return (
  //     <div>
  //       <img src={stateProductDetails?.image} width={50} height={50}/>
  //     </div>
  //   )
  // }

  // Handle search product - lib
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  // Search product - lib 
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps('name')
    },
    // {
    //   title: 'Image',
    //   dataIndex: 'image',
    //   render: renderImage
    // },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
      // sorter product - lib
      filters: [
        {
          text: '>= 50',
          value: '>=',
        },
        {
          text: '<= 50',
          value: '<=',
        },
      ],
      onFilter: (value, record) => {
        // console.log('value', {value, record})
        if (value === '>=') {
          return Number(record.price) >= 50
        }
        return Number(record.price) <= 50
      }
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      sorter: (a, b) => a.rating - b.rating,
      // sorter product - lib
      filters: [
        {
          text: '>= 3',
          value: '>=',
        },
        {
          text: '<= 3',
          value: '<=',
        },
      ],
      onFilter: (value, record) => {
        // console.log('value', {value, record})
        if (value === '>=') {
          return Number(record.rating) >= 3
        }
        return Number(record.rating) <= 3
      }
    },
    {
      title: 'Type',
      dataIndex: 'type',
      // sorter: (a, b) => a.type - b.type
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
    } else if (isError) {
      message.error()
    }
  }, [isSuccess])

  useEffect(() => {
    if(isSuccessDeletedMany && dataDeletedMany?.status === 'OK') {
      message.success()
    } else if (isErrorDeletedMany) {
      message.error()
    }
  }, [isSuccessDeletedMany])

  useEffect(() => {
    if(isSuccessDeleted && dataDeleted?.status === 'OK') {
      message.success()
      handleCancelDelete()
    } else if (isErrorDeleted) {
      message.error()
    }
  }, [isSuccessDeleted])

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false)
  }

  const handleDeleteProduct = () => {
      mutationDeleted.mutate({id: rowSelected, token: user?.access_token}, {
        onSettled: () => {
          queryProduct.refetch()
        } 
      })
  }
  
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

  // console.log('stateProduct', stateProduct)
  
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

  const handleOnchangeDetails = (e) => {
    // console.log('e.target.name', e.target.name, e.target.value)
    setStateProductDetails({
      ...stateProductDetails,
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

  const handleOnchangeAvatarDetails = async ({fileList}) => {
    const file = fileList[0]
    if(!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setStateProductDetails({
      ...stateProductDetails, 
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
        <TableComponent handleDeletedManyProduct={handleDeletedManyProduct} data={dataTable} columns={columns} onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setRowSelected(record._id)
            }, 

          };
        }}/>
      </div>

      <ModalComponent 
        forceRender
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
              name="name"
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
      </ModalComponent>

      <DrawerComponent title="Detail product" isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="50%">
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
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input your Name!',
                },
              ]}
            >
              <InputComponent value={stateProductDetails['name']} onChange={handleOnchangeDetails} name="name"/>
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
              <InputComponent value={stateProductDetails['type']} onChange={handleOnchangeDetails} name="type"/>
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
              <InputComponent value={stateProductDetails['countInStock']} onChange={handleOnchangeDetails} name="countInStock"/>
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
              <InputComponent value={stateProductDetails['price']} onChange={handleOnchangeDetails} name="price"/>
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
              <InputComponent value={stateProductDetails['rating']} onChange={handleOnchangeDetails} name="rating"/>
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
              <InputComponent value={stateProductDetails['description']} onChange={handleOnchangeDetails} name="description"/>
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
              {/* <WrapperUploadFile onChange={handleOnchangeAvatarDetails}>
                <Button>Select file</Button>
                {stateProductDetails?.image && (
                  <img src={stateProductDetails?.image} style={{
                    height: '6rem',
                    width: '6rem',
                    borderRadius: '50%',
                    marginLeft: '1rem',
                    objectFit: 'cover'
                  }}/>
                )}
              </WrapperUploadFile> */}
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
      </DrawerComponent>

      <ModalComponent 
        title="Delete Product" 
        open={isModalOpenDelete} 
        onOk={handleDeleteProduct} 
        onCancel={handleCancelDelete}
      >
        {/* <Loading isPending={isPending}> */}
          <div>Do you want to delete this product?</div>
        {/* </Loading> */}
      </ModalComponent>
    </div>
  )
}

