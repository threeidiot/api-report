import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Table, Tag, Button, Divider, Row, Col } from 'antd'
import ApiEditModal from 'views/api/ApiEditModal'
import ActiveProject from 'views/project/ActiveProject'
import './ProjectDetail.scss'

@inject('stores')
@observer
export default class ProjectDetail extends Component {
  constructor (props) {
    super(props)
    this.projectsStore = props.stores.projectsStore
    this.apisStore = props.stores.apisStore

    // 获取参数的方式
    this.projectsStore.prepareData(props.match.params.id)
    this.apisStore.fetchRows(props.match.params.id)
  }

  componentWillReceiveProps (props) { }

  componentDidMount () { }

  openApiEditModal (id) {
    this.apiEditModal.show(id)
  }

  gotoApiDetail (aid) {
    const path = `/project/${this.projectsStore.currId}/api/${aid}`
    this.props.history.push(path)
  }

  render () {
    const columns = [{
      title: '请求方法',
      width: 150,
      dataIndex: 'method',
      render: value => {
        if (value === 'post') {
          return <Tag color='volcano'>{value}</Tag>
        }
        return <Tag color='geekblue'>{value}</Tag>
      }
    }, {
      title: '请求路径',
      dataIndex: 'path'
    }, {
      title: '摘要',
      dataIndex: 'summary'
    }, {
      title: '操作',
      width: 200,
      render: (_, row) => {
        return (
          <span>
            <Button type='primary' ghost size='small' icon='edit'
              onClick={_ => this.openApiEditModal(row.id)}>编辑</Button>
            <Divider type='vertical' />
            <Button type='primary' ghost size='small' icon='play-circle-o'
              onClick={_ => this.gotoApiDetail(row.id)}>调试</Button>
          </span>
        )
      }
    }]

    return (
      <div className='project-detail'>

        <div className='project'>
          <Row>
            <Col span={12}>
              <ActiveProject activeProjectId={this.projectsStore.row.id} />
            </Col>
            <Col span={12} className='btns'>
              <Button type='primary' icon='plus' size='small' onClick={_ => this.openApiEditModal(0)}>添加接口</Button>
            </Col>
          </Row>
          <Divider />
        </div>

        <Table
          pagination={false}
          bordered
          columns={columns}
          dataSource={this.apisStore.sortedArrRows}
          rowKey='id'
        />

        <ApiEditModal wrappedComponentRef={m => (this.apiEditModal = m)} {...this.props} />
      </div>
    )
  }
}
