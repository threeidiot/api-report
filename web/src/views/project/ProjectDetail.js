import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Table, Tag, Button, Divider } from 'antd'
import './ProjectDetail.scss'

@inject('stores')
@observer
export default class ProjectDetail extends Component {
  constructor (props) {
    super(props)
    this.projectsStore = props.stores.projectsStore
    this.apisStore = props.stores.apisStore

    // 获取参数的方式
    // props.match.params.index
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

    return (
      <div className='project-detail'>
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
