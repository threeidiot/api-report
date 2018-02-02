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
    this.projectsStore = this.props.stores.projectsStore
  }

  componentDidMount () {
    this.projectsStore.fetchRows()
  }

  render () {
    return (
      <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
        <div className='logo'>API Report</div>
        <Menu theme='dark' mode='inline'>
          {
            this.projectsStore.rows.map((p, i) => {
              return (
                <Menu.Item key={p.id}>
                  <Link to={`/project/${i}`} className='link'>{p.title}</Link>
                </Menu.Item>
              )
            })
          }
        </Menu>
      </Sider>
    )
  }
}
