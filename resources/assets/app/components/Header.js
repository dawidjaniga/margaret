import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
const { Header } = Layout

const items = [
  {
    name: 'Home',
    href: '/'
  },
  {
    name: 'Login',
    href: '/login'
  },
  {
    name: 'Rules',
    href: '/rules'
  },
  {
    name: 'Practice',
    href: '/practice'
  },
  {
    name: 'Progress',
    href: '/progress'
  }
]

export default function () {
  return (
    <Header>
      <div className='logo' />
      <Menu
        theme='dark'
        mode='horizontal'
        style={{ lineHeight: '64px' }}
      >
        {items.map((item, index) =>
          <Menu.Item key={index}>
            <Link to={item.href}>{item.name}</Link>
          </Menu.Item>)}
      </Menu>
    </Header>
  )
}
