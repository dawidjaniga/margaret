import React from 'react'
import { Layout, Menu } from 'antd'
const { Header } = Layout

export default function () {
  return (
    <Header>
      <div className='logo' />
      <Menu
        theme='dark'
        mode='horizontal'
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key='1'>Login</Menu.Item>
        <Menu.Item key='2'>Practice</Menu.Item>
        <Menu.Item key='3'>Progress</Menu.Item>
      </Menu>
    </Header>
  )
}
