import React, { useEffect, useRef, useState } from 'react'
import { WrapperHeaderAdmin, WrapperUploadFile } from '../../style'
import { Button, Form, Space } from 'antd'
import { PlusCircleFilled, DeleteOutlined, EditOutlined, SearchOutlined} from '@ant-design/icons'
import TableComponent from '../layout/table'
import InputComponent from '../layout/input'
import DrawerComponent from '../layout/drawerComponent'
import ModalComponent from '../layout/modalComponent'
import * as message from '../../components/layout/message'
import * as userService from '../../services/userService'
import { useSelector } from 'react-redux'
import { useMutationHooks } from '../../hooks/userMutationHook'
import { getBase64 } from '../../utils'
import { useQueries, useQuery } from '@tanstack/react-query'

export default function AdminUser() {
   // Infor product neccessary
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [rowSelected, setRowSelected] = useState('')
   const [isOpenDrawer, setIsOpenDrawer] = useState(false)
   const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
   const user = useSelector((state) => state?.user)
   const [searchText, setSearchText] = useState('');
   const [searchedColumn, setSearchedColumn] = useState('');
   const searchInput = useRef(null);
   const [stateUser, setStateUser] = useState({
     name: '',
     email: '',
     phone: '',
     address: '',
     isAdmin: false
   })
 
   const [stateUserDetails, setStateUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    isAdmin: false
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
     const res = userService.signupUser({
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
       const res = userService.deleteUser(id, token)
       return res
     }
   )

   const mutationUpdate = useMutationHooks(
    (data) => {
      const {
        id, 
        token, 
        ...rests
      } = data
      const res = userService.updateUser(id, {...rests}, token)
      return res
    }
  )
 
   const getAllUsers = async () => {
     const res = await userService.getAllUser()
     return res
     // console.log('res', res)
   }
 
   const fetchGetDetailsUser = async (rowSelected) => {
     const res = await userService.getDetailUser(rowSelected)
     if(res?.data) {
       setStateUserDetails({
         name: res?.data.name,
         email: res?.data.email,
         phone: res?.data.phone,
         address: res?.data.address,
         isAdmin: res?.data.isAdmin,
       })
     }
   }
 
   useEffect(() => {
     form.setFieldsValue(stateUserDetails)
   }, [form, setStateUserDetails])
 
   useEffect(() => {
     if(rowSelected) {
       fetchGetDetailsUser(rowSelected)
     }
   }, [rowSelected])
   // console.log('StateUser', stateUserDetails)
 
   const handleDetailsUser = () => {
     setIsOpenDrawer(true)
     // console.log('rowSelected', rowSelected)
   }
 
   const {data, isPending, isSuccess, isError} = mutation
   const {data: dataDeleted, isPending: isPendingDelete, isSuccess: isSuccessDeleted, isError: isErrorDeleted} = mutationDeleted
 
   // console.log('data', data)
   const queryUser = useQuery({queryKey: ['users'], queryFn:getAllUsers})
   const {isPending: isPendingUsers, data: users} = queryUser
   const renderAction = () => {
     return (
       <div>
         <DeleteOutlined style={{cursor: 'pointer', color: 'red', fontSize: '3rem'}} onClick={() => setIsModalOpenDelete(true)}/>
         <EditOutlined style={{cursor: 'pointer', color: 'orange', fontSize: '3rem'}} onClick={handleDetailsUser}/>
         {/* onClick={handleDetailProduct} */}
       </div>
     )
   }
 
   const renderImage = () => {
     return (
       <div>
         <img src={stateUserDetails?.image} width={50} height={50}/>
       </div>
     )
   }
 
   // Handle search User - lib
   const handleSearch = (selectedKeys, confirm, dataIndex) => {
     confirm();
     setSearchText(selectedKeys[0]);
     setSearchedColumn(dataIndex);
   };
   const handleReset = (clearFilters) => {
     clearFilters();
     setSearchText('');
   };
 
   // Search User - lib 
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
     {
       title: 'Email',
       dataIndex: 'email',
       sorter: (a, b) => a.email.length - b.email.length,
       ...getColumnSearchProps('email')
     },
     {
       title: 'Admin',
       dataIndex: 'isAdmin',
       filters: [
        {
          text: 'True',
          value: true,
        },
        {
          text: 'False',
          value: false,
        },
      ],
     },
     {
       title: 'Phone',
       dataIndex: 'phone',
       sorter: (a, b) => a.phone - b.phone,
       ...getColumnSearchProps('phone')
     },
     {
       title: 'Address',
       dataIndex: 'address',
       sorter: (a, b) => a.addres.length - b.addres.length,
       ...getColumnSearchProps('addres')
     },
     {
      title: 'Action',
      dataIndex: 'action',
      render: renderAction
    },
   ];
 
   const dataTable = users?.data?.length && users?.data?.map((user) => {
     return {...user, key: user._id, isAdmin: user.isAdmin ? 'True' : 'False'}
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
         queryUser.refetch()
       } 
     })
   }
   
   // Toggle open/close modal. If cancel close modal. Else if OK send data
   const handleCancel = () => {
     setIsModalOpen(false)
     setStateUser({
      name: '',
      email: '',
      phone: '',
      address: '',
      isAdmin: false
     })
     form.resetFields()
   }
 
   // console.log('stateProduct', stateProduct)
   
   // Submit send data: success & fail
   const onFinish = () => {
     mutation.mutate(stateUser)
     // console.log('Success:', stateProduct);
   };
   // const onFinishFailed = (errorInfo) => {
     //   console.log('Failed:', errorInfo);
   // };
   
   // Get value input by onchange
   const handleOnchange = (e) => {
     // console.log('e.target.name', e.target.name, e.target.value)
     setStateUser({
       ...stateUser,
       [e.target.name]: e.target.value
     })
   }
 
   const handleOnchangeDetails = (e) => {
     // console.log('e.target.name', e.target.name, e.target.value)
     setStateUserDetails({
       ...stateUserDetails,
       [e.target.name]: e.target.value
     })
   }
 
   // Choose image User use getBase64
   const handleOnchangeAvatar = async ({fileList}) => {
     const file = fileList[0]
     if(!file.url && !file.preview) {
       file.preview = await getBase64(file.originFileObj)
     }
     setStateUser({
       ...stateUser, 
       image: file.preview
     })
   }
 
   const handleOnchangeAvatarDetails = async ({fileList}) => {
     const file = fileList[0]
     if(!file.url && !file.preview) {
       file.preview = await getBase64(file.originFileObj)
     }
     setStateUserDetails({
       ...stateUserDetails, 
       image: file.preview
     })
   }
  return (
    <div>
      <WrapperHeaderAdmin>Manage Users</WrapperHeaderAdmin>
      <div style={{marginTop: '1rem'}}>
        <Button style={{
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
        <TableComponent data={dataTable} columns={columns} onRow={(record, rowIndex) => {
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
              <InputComponent value={stateUser.name} onChange={handleOnchange} name="name"/>
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your Email!',
                },
              ]}
            >
              <InputComponent value={stateUser.email} onChange={handleOnchange} name="email"/>
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: 'Please input your Phone!',
                },
              ]}
            >
              <InputComponent value={stateUser.phone} onChange={handleOnchange} name="phone"/>
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[
                {
                  required: true,
                  message: 'Please input your address!',
                },
              ]}
            >
              <InputComponent value={stateUser.address} onChange={handleOnchange} name="address"/>
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
                {stateUser?.image && (
                  <img src={stateUser?.image} style={{
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
              <InputComponent value={stateUserDetails.name} onChange={handleOnchangeDetails} name="name"/>
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            >
              <InputComponent value={stateUserDetails.email} onChange={handleOnchangeDetails} name="email"/>
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: 'Please input your InStock!',
                },
              ]}
            >
              <InputComponent value={stateUserDetails.phone} onChange={handleOnchangeDetails} name="phone"/>
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[
                {
                  required: true,
                  message: 'Please input your address!',
                },
              ]}
            >
              <InputComponent value={stateUserDetails.address} onChange={handleOnchangeDetails} name="address"/>
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
                {stateUserDetails?.image && (
                  <img src={stateUserDetails?.image} style={{
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
        title="Delete User" 
        open={isModalOpenDelete} 
        onOk={handleDeleteProduct} 
        onCancel={handleCancelDelete}
      >
        {/* <Loading isPending={isPending}> */}
          <div>Do you want to delete this user?</div>
        {/* </Loading> */}
      </ModalComponent>
    </div>
  )
}
