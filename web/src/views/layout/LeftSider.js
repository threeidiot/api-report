import React from 'react'
import { Menu, Layout, Button } from 'antd'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import './LeftSider.scss'
import ProjectEditModal from 'views/project/ProjectEditModal'

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
    this.projectsStore.fetchRows().then(index => {
      if (index > -1) {
        this.apisStore.fetchRows(this.projectsStore.row.id)
      }
    })
  }

  onLinkClick (index) {
    this.projectsStore.setIndex(index)
    this.apisStore.fetchRows(this.projectsStore.row.id)
  }

  openProjectEditModal () {
    this.projectEditModal.show()
  }

  render () {
    return (
      <Sider className='left-sider'>

        <div className='logo'>API Report</div>

        <div className='add-project-btn'>
          <Button type='dashed' ghost icon='plus' onClick={_ => this.openProjectEditModal()}>添加项目</Button>
          <ProjectEditModal
            wrappedComponentRef={m => (this.projectEditModal = m)}
            index={-1}
            {...this.props}
          />
        </div>

        <Menu theme='dark' mode='inline' selectedKeys={[this.projectsStore.index + '']}>
          {
            this.projectsStore.rows.map((p, i) => {
              return (
                <Menu.Item key={i} >
                  <Link to={`/project/${i}`} onClick={_ => this.onLinkClick(i)} className='link'>{p.title}</Link>
                </Menu.Item>
              )
            })
          }
        </Menu>

      </Sider>
    )
  }
}
