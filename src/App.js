import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import routes from './routes'
import Default from './components/layout/default'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { isJsonString } from './utils'
import { jwtDecode } from "jwt-decode";
import * as userService from './services/userService'
import { useDispatch } from 'react-redux'
import { updateUser } from './redux/slice/userSlide'

export function App() {

  // useEffect(() => {
  //   fetchApi()
  // }, [])

  // const fetchApi = async () => {
  //   const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/getAll`)
  //   // console.log('res', res)
  //   return res.data
  // }
  // // console.log('process.env.REACT_API_URL_BACKEND', process.env.REACT_APP_API_URL)

  // const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi })
  // console.log(query)

  const dispatch = useDispatch()
  
  useEffect(() => {
    const {storageData, decoded} = handleDecoded()
    if(decoded?.id) {
      handleGetDetailUser(decoded?.id, storageData)
    } 
  }, [])

  // Check trước khi getDetail. Nếu token hết hạn sẽ gọi đến refresh_token và lấy access_token mới bỏ vào config. Thì lúc này getDetail sẽ có access_token mới.
  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token')
    // console.log('storageData', storageData, isJsonString(storageData));
    let decoded = {}
    if(storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData)
      decoded = jwtDecode(storageData);
      // console.log('decoded', decoded)
    }
    return {decoded, storageData}
  }

  userService.axiosJWT.interceptors.request.use(async (config) => {
    const currentTime = new Date()
    const {decoded} = handleDecoded()
    if(decoded?.exp < currentTime.getTime() / 1000) {
      const data = await userService.refreshToken()
      config.headers['token'] = `Beare ${data?.access_token}`
    }
      return config;
  }, (error) => {
    // Do something with request error
    return Promise.reject(error);
  });

  const handleGetDetailUser = async (id, token) => {
    const res = await userService.getDetailUser(id, token)
    dispatch(updateUser({...res?.data, access_token: token}))
    // console.log('res', res)
  }

  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page
            const Layout = route.isShowHeader ? Default : Fragment
            return (
              <Route key={route.path} path={route.path} element={
                <Layout>
                  <Page/>
                </Layout>
              }/>
            )
          })}
        </Routes>
      </Router>
    </div>
  )
}

export default App