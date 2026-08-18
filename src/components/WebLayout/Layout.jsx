import React from 'react'
 
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import PageHeader from './PageHeader'
import WebsiteStyles from './WebsiteStyles'
 

function Layout() {
  return (
    <>
    <WebsiteStyles/>
     
      <Header />
       <PageHeader />

      <Outlet />

      <Footer />
    </>
  )
}

export default Layout