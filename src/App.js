import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import routes from './routes'
import Default from './components/layout/default'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

export function App() {

  // useEffect(() => {
  //   fetchApi()
  // }, [])

  const fetchApi = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/getAll`)
    // console.log('res', res)
    return res.data
  }
  // console.log('process.env.REACT_API_URL_BACKEND', process.env.REACT_APP_API_URL)

  const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi })
  console.log(query)

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