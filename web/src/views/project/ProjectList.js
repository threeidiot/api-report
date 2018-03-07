import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Card, Row, Col, Icon, Tag, Badge, Button } from 'antd'
import ProjectEditModal from 'views/project/ProjectEditModal'

import './ProjectList.scss'

const { Meta } = Card

@inject('stores')
@observer
export default class ProjectList extends Component {
  constructor (props) {
    super(props)
    this.projectsStore = this.props.stores.projectsStore
    this.apisStore = this.props.stores.apisStore
  }

  componentDidMount () {
    this.projectsStore.fetchRows()
    this.projectsStore.setCurrId(0)
  }

  openProjectEditModal (id) {
    this.projectEditModal.show(id)
  }

  gotoProjectDetail (id) {
    const path = `/project/${id}`
    this.props.history.push(path)
  }

  deleteProject (id) {

  }

  render () {
    return (
      <div className='project-list'>
        <Row gutter={16}>

          <Col span={6} className='add-project' key={0}>
            <Button type='dashed' ghost icon='plus' onClick={_ => this.openProjectEditModal(0)}>添加项目</Button>
          </Col>

          {
            this.projectsStore.sortedKeys.map(id => {
              const p = this.projectsStore.rows.get(id)
              return (
                <Col span={6} className='project-col' key={id}>
                  <Card actions={[
                    <Icon type='api' onClick={_ => this.gotoProjectDetail(id)} />,
                    <Icon type='edit' onClick={_ => this.openProjectEditModal(id)} />,
                    <Icon type='delete' onClick={_ => this.deleteProject(id)} />
                  ]}>
                    <Meta
                      onClick={_ => this.gotoProjectDetail(id)}
                      title={<h3><Badge status='default' /> {p.title}</h3>}
                      description={<Tag color='blue'>{`${p.schemes}://${p.host}${p.base_path}`}</Tag>}
                    />
                  </Card>
                </Col>
              )
            })
          }

        </Row>

        <ProjectEditModal wrappedComponentRef={m => (this.projectEditModal = m)} {...this.props} />
      </div>
    )
  }
}
