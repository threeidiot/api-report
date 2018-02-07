import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Table, Tag, Button, Divider, Row, Col } from 'antd'
import './ProjectDetail.scss'

@inject('stores')
@observer
export default class ProjectDetail extends Component {
  constructor (props) {
    super(props)
    this.projectsStore = props.stores.projectsStore
    this.apisStore = props.stores.apisStore

    // 获取参数的方式
    this.projectsStore.setCurrId(props.match.params.id)
  }

  componentWillReceiveProps (props) { }

  componentDidMount () { }

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
      render: _ => {
        return (
          <span>
            <Button className='edit-btn' type='primary' size='small' icon='edit'>编辑</Button>
            <Divider type='vertical' />
            <Button className='debug-btn' type='primary' size='small' icon='play-circle-o'>调试</Button>
          </span>
        )
      }
    }]

    const project = this.projectsStore.row

    return (
      <div className='project-detail'>

        <div className='project'>
          <Row>
            <Col span={12}>
              <h3>{project.title}</h3>
              <Tag color='blue'>{project.schemes}://{project.host}{project.base_path}</Tag>
            </Col>
            <Col span={12} className='btns'>
              <Button type='primary' icon='plus' size='small'>添加接口</Button>
            </Col>
          </Row>
          <Divider />
        </div>

        <Table
          pagination={false}
          bordered
          columns={columns}
          dataSource={this.apisStore.rows.slice()}
          rowKey='id'
        />
      </div>
    )
  }
}
