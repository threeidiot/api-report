import React from 'react'
import { Menu, Layout, Icon } from 'antd'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import './LeftSider.scss'

const { Sider } = Layout

@inject('stores')
@observer
export default class LeftSider extends React.Component {
  constructor (props, context) {
    super(props)
    this.projectsStore = this.props.stores.projectsStore
  }

  componentDidMount () { }

  gotoHome () {
    this.projectsStore.setCurrId(0)
  }

  render () {
    return (
      <Sider className='left-sider'>

        <div className='logo'>
          <Link to='/' onClick={_ => this.gotoHome()}>API Report</Link>
        </div>

        <Menu theme='dark' mode='inline'>
          <Menu.Item key={0} >
            <Link to={'/'}><Icon type='home' /> 项目列表</Link>
          </Menu.Item>
        </Menu>

      </Sider>
    )
  }
}
