import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Tag, Button, Divider, Row, Col, Form, Input, Icon } from 'antd'
import * as api from 'helpers/api'
import ReactJson from 'react-json-view'
import ParamEditModal from 'views/param/ParamEditModal'
import DefParamEditModal from 'views/param/DefParamEditModal'
import ActiveProject from 'views/project/ActiveProject'
import './ApiDetail.scss'

const FormItem = Form.Item

@inject('stores')
@observer
class ApiDetail extends Component {
  constructor (props) {
    super(props)
    // 设置需要使用的 store
    this.projectsStore = props.stores.projectsStore
    this.apisStore = props.stores.apisStore
    this.paramsStore = props.stores.paramsStore
    this.defParamsStore = props.stores.defParamsStore

    // 初始化数据
    this.projectsStore.setCurrId(props.match.params.pid)
    this.apisStore.setCurrId(props.match.params.aid)
    this.formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 17 }
    }

    this.state = { json: '' }

    // 获取数据
    this.paramsStore.fetchRows(this.apisStore.currId)
    this.defParamsStore.fetchRows(this.projectsStore.currId)
  }

  componentWillReceiveProps (props) { }

  componentDidMount () { }

  openParamEditModal (id) {
    this.paramEditModal.show(id, this.apisStore.currId)
  }

  openDefParamEditModal (id) {
    this.defParamEditModal.show(id, this.projectsStore.currId)
  }

  getFormItems () {
    const { getFieldDecorator } = this.props.form

    const formItems = this.paramsStore.sortedArrRows.map((p, i) => {
      return (
        <FormItem {...this.formItemLayout} required={p.required} key={`p${i}`} help={p.description} label={p.name} >
          {
            getFieldDecorator(p.name, {
              initialValue: p.default || '',
              rules: [{ required: p.required, message: '请输入必填字段' }]
            })(<Input className='param-input' />)
          }
          <span className='param-type'>
            <Tag color='geekblue' onClick={_ => this.openParamEditModal(p.id)}><Icon type='edit' /></Tag>
            <Tag color='purple'>{p.type}</Tag>
          </span>
        </FormItem>
      )
    })

    return formItems
  }

  getDefFormItems () {
    const { getFieldDecorator } = this.props.form

    let defParam = []
    let defHeader = []

    this.defParamsStore.sortedArrRows.map((p, i) => {
      const formItem = (
        <FormItem {...this.formItemLayout} required={p.required} key={`g${i}`} help={p.description} label={p.name}>
          {
            getFieldDecorator(p.name, {
              initialValue: p.default || '',
              rules: [{ required: p.required, message: '请输入必填字段' }]
            })(<Input className='param-input' />)
          }
          <span className='param-type'>
            <Tag color='geekblue' onClick={_ => this.openDefParamEditModal(p.id)}><Icon type='edit' /></Tag>
            <Tag color='purple'>{p.type}</Tag>
          </span>
        </FormItem>
      )
      if (p.in === 'header') {
        defHeader.push(formItem)
      } else {
        defParam.push(formItem)
      }
    })

    if (defParam.length > 0) {
      defParam.splice(0, 0, <Divider key='divider-def-param'>全局参数</Divider>)
    }

    if (defHeader.length > 0) {
      defHeader.splice(0, 0, <Divider key='divider-def-header'>全局 HTTP Header</Divider>)
    }

    return defParam.concat(defHeader)
  }

  submitDebug () {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const params = { api_id: this.apisStore.currId, ...values }
        api.get('/api/debug', params).then(result => {
          if (result) {
            this.setState({ json: result.json })
          }
        })
      }
    })
  }

  render () {
    const project = this.projectsStore.row

    return (
      <div className='api-detail'>
        <Row type='flex'>
          <Col span={12} className='left-block'>
            <div className='project'>
              <ActiveProject activeProjectId={project.id} />
              <Divider />
            </div>

            <Form>
              {this.getFormItems()}
              <FormItem wrapperCol={{ span: 17, offset: 7 }}>
                <Button size='small' type='primary' icon='play-circle-o'
                  onClick={_ => this.submitDebug()}>调试运行</Button>
                <Divider type='vertical' />
                <Button size='small' type='primary' ghost icon='plus'
                  onClick={_ => this.openParamEditModal(0)}>添加参数</Button>
                <Divider type='vertical' />
                <Button size='small' type='primary' ghost icon='plus'
                  onClick={_ => this.openDefParamEditModal(0)}>添加全局参数</Button>
              </FormItem>
              {this.getDefFormItems()}
            </Form>
          </Col>

          <Col span={12} className='right-block'>
            <ReactJson
              src={this.state.json === '' ? {} : this.state.json}
              name={null}
              iconStyle='circle'
              theme='monokai'
            />
          </Col>
        </Row>

        <ParamEditModal wrappedComponentRef={m => (this.paramEditModal = m)} stores={this.props.stores} />
        <DefParamEditModal wrappedComponentRef={m => (this.defParamEditModal = m)} stores={this.props.stores} />
      </div>
    )
  }
}

const WrappedApiDetail = Form.create()(ApiDetail)

export default WrappedApiDetail
