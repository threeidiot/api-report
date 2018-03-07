import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'
import './TopHeader.scss'

const { Header } = Layout
// const SubMenu = Menu.SubMenu

@inject('stores')
@observer
export default class TopHeader extends React.Component {
  constructor (props, context) {
    super(props)
    this.projectsStore = this.props.stores.projectsStore
  }

  openProjectEditModal (e) {
    e.preventDefault()
    this.projectEditModal.show()
  }

  render () {
    let activeProject = this.projectsStore.currId > 0

    return (
      <Header className='top-header' >
        <Menu mode='horizontal' selectedKeys={[]}>

          <Menu.Item key='def-param' disabled={!activeProject}>
            <Link to={`/project/${this.projectsStore.currId}/param`}><Icon type='paper-clip' /> 全局参数</Link>
          </Menu.Item>

        </Menu>
      </Header>
    )
  }
}
