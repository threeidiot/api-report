import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'
import './TopHeader.scss'

const { Header } = Layout
const SubMenu = Menu.SubMenu

@inject('stores')
@observer
export default class TopHeader extends React.Component {
  constructor (props, context) {
    super(props)
    this.projectsStore = this.props.stores.projectsStore
  }

  gotoHome () {
    this.projectsStore.setCurrId(0)
  }

  render () {
    let activeProject = this.projectsStore.currId > 0
    console.log(activeProject)

    return (
      <Header className='top-header' >
        <Menu mode='horizontal' selectedKeys={[]}>

          <Menu.Item key='home' disabled={!activeProject}>
            <Link to='/' onClick={_ => this.gotoHome()}><Icon type='home' /> 返回首页</Link>
          </Menu.Item>

          <SubMenu disabled={!activeProject} title={<span><Icon type='bars' />项目管理</span>}>
            <Menu.Item key='project-edit'>
              <Icon type='edit' /> 修改项目信息
            </Menu.Item>
          </SubMenu>

        </Menu>
      </Header>
    )
  }
}
