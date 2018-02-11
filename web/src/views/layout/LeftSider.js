import React from 'react'
import { Menu, Layout, Button } from 'antd'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import ProjectEditModal from 'views/project/ProjectEditModal'
import './LeftSider.scss'

const { Sider } = Layout

@inject('stores')
@observer
export default class LeftSider extends React.Component {
  constructor (props, context) {
    super(props)
    this.projectsStore = this.props.stores.projectsStore
    this.apisStore = props.stores.apisStore
  }

  componentDidMount () {
    this.projectsStore.fetchRows().then(result => {
      if (this.projectsStore.currId > 0) {
        this.apisStore.fetchRows(this.projectsStore.currId)
      }
    })
  }

  switchProject (id) {
    this.projectsStore.setCurrId(id)
    this.apisStore.fetchRows(id)
  }

  openProjectEditModal () {
    this.projectEditModal.show()
  }

  gotoHome () {
    this.projectsStore.setCurrId(0)
  }

  render () {
    return (
      <Sider className='left-sider'>

        <div className='logo'>
          <Link to='/' onClick={_ => this.gotoHome()}>API Report</Link>
        </div>

        <div className='add-project-btn'>
          <Button type='dashed' ghost icon='plus' onClick={_ => this.openProjectEditModal()}>添加项目</Button>
          <ProjectEditModal wrappedComponentRef={m => (this.projectEditModal = m)} id={0} {...this.props} />
        </div>

        <Menu theme='dark' mode='inline' selectedKeys={[this.projectsStore.currId + '']}>
          {
            this.projectsStore.sortedKeys.map(id => {
              const p = this.projectsStore.rows.get(id)
              return (
                <Menu.Item key={id} >
                  <Link to={`/project/${id}`} onClick={_ => this.switchProject(id)}>{p.title}</Link>
                </Menu.Item>
              )
            })
          }
        </Menu>

      </Sider>
    )
  }
}
