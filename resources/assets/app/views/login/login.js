import React from 'react'
import { Layout, Breadcrumb } from 'antd'
import Header from './../../components/Header'
import Footer from './../../components/Footer'

const { Content } = Layout

export default function LoginView () {
  return (
    <Layout className='layout'>
      <Header />
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>Apps</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: '#fff', padding: 24, minHeight: 290 }}>. Login</div>
      </Content>
      <Footer />
    </Layout>
  )
}
