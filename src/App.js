import React, { Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import routes from './routes'
import Default from './components/layout/default'

export function App() {
  return (
    <Fragment>
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
    </Fragment>
  )
}

export default App