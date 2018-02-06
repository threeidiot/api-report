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

    this.updateRenderData(props)
  }

  componentWillReceiveProps (props) {
    this.updateRenderData(props)
  }

  componentDidMount () {
  }

  updateRenderData (props) {
    // 首页时，没有 url 参数, 不用执行 LeftSider.js 已经获取
    if (props.match.params.index) {
      this.projectsStore.setIndex(props.match.params.index)
      this.apisStore.fetchRows(this.projectsStore.row.id)
    }
  }

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
          columns={columns}
          dataSource={this.apisStore.rows.slice()}
          rowKey='id'
          bordered
        />
      </div>
    )
  }
}
