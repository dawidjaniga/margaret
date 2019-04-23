import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
const { Header } = Layout

export default function () {
  return (
    <Header>
      <div className='logo' />
      <Menu
        theme='dark'
        mode='horizontal'
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key='1'>
          <Link to='/'>Home</Link>
        </Menu.Item>
        <Menu.Item key='2'>
          <Link to='/login'>Login</Link>
        </Menu.Item>
        <Menu.Item key='3'>
          <Link to='/practice'>Practice</Link>
        </Menu.Item>
      </Menu>
    </Header>
  )
}
