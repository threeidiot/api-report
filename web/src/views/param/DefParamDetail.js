import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Table, Tag, Button, Divider, Row, Col, Icon } from 'antd'
import ApiEditModal from 'views/api/ApiEditModal'
import './DefParamDetail.scss'

@inject('stores')
@observer
export default class DefParamDetail extends Component {
  constructor (props) {
    super(props)
    this.defParamsStore = props.stores.defParamsStore
    this.projectsStore = props.stores.projectsStore

    // 获取参数的方式
    this.projectsStore.setCurrId(props.match.params.id)

    this.defParamsStore.fetchRows(this.projectsStore.currId)
  }

  render () {
    const columns = [{
      title: '字段名',
      dataIndex: 'name'
    }, {
      title: '解释',
      dataIndex: 'description'
    }, {
      title: '字段位置',
      dataIndex: 'in',
      render: value => {
        if (value === 'header') {
          return <Tag color='volcano'>{value}</Tag>
        }
        return <Tag color='green'>{value}</Tag>
      }
    }, {
      title: '类型',
      dataIndex: 'type',
      render: value => {
        return <Tag color='purple'>{value}</Tag>
      }
    }, {
      title: '是否必须',
      dataIndex: 'required',
      render: value => {
        if (value === 1) {
          return <Icon type='check' style={{ color: '#87d068' }} />
        }
        return <Icon type='minus' style={{ color: '#f50' }} />
      }
    }, {
      title: '默认值',
      dataIndex: 'default'
    }, {
      title: '操作',
      width: 200,
      render: (_, row) => {
        return (
          <span>
            <Button type='primary' ghost size='small' icon='edit'
              onClick={_ => this.openApiEditModal(row.id)}>编辑</Button>
          </span>
        )
      }
    }]

    const project = this.projectsStore.row

    return (
      <div className='def-param-detail'>

        <div className='project'>
          <Row>
            <Col span={12}>
              <h3>{project.title} - 全局参数</h3>
            </Col>
            <Col span={12} className='btns'>
              <Button type='primary' icon='plus' size='small' onClick={_ => this.openApiEditModal(0)}>添加全局参数</Button>
            </Col>
          </Row>
          <Divider />
        </div>

        <Table
          pagination={false}
          bordered
          columns={columns}
          dataSource={this.defParamsStore.sortedArrRows}
          rowKey='id'
        />

        <ApiEditModal wrappedComponentRef={m => (this.apiEditModal = m)} {...this.props} />
      </div>
    )
  }
}
