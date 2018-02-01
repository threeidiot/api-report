import React from 'react'
import { Menu, Layout } from 'antd'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'

const { Sider } = Layout

@inject('stores')
@observer
export default class LeftSider extends React.Component {
  constructor (props) {
    super(props)
    this.routeStore = this.props.stores.routeStore
  }

  render () {
    return (
      <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
        <div className='logo'>API Report</div>
        <Menu theme='dark' mode='inline'>
          <Menu.Item key={1}>
            <Link to='/project/detail' className='link'>测试项目-1</Link>
          </Menu.Item>
          <Menu.Item key={2}>
            <Link to='/doc/edit' className='link'>测试项目-2</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
}
