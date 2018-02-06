import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Table, Tag } from 'antd'

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
    }]

    return (
      <div className='project-detail'>
        <Table
          bordered
          size='small'
          columns={columns}
          dataSource={this.apisStore.rows.slice()}
          rowKey='id'
        />
      </div>
    )
  }
}
