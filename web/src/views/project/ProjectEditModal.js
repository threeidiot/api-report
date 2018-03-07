import React, { Component } from 'react'
import { Modal, Form, Input } from 'antd'

const FormItem = Form.Item

class ProjectEditModal extends Component {
  constructor (props) {
    super(props)
    this.projectsStore = props.stores.projectsStore
    this.apisStore = props.stores.apisStore

    this.state = {
      id: 0,
      visible: false
    }
  }

  show (id) {
    this.setState({
      id: id,
      visible: true
    })
  }

  hide () {
    this.setState({
      id: 0,
      visible: false
    })
  }

  save () {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.projectsStore.saveRow(values).then(result => {
          this.setState({
            id: 0,
            visible: false
          })
        })
      }
    })
  }

  render () {
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 }
    }

    const { getFieldDecorator } = this.props.form
    const row = this.projectsStore.rows.get(this.state.id) || {}

    return (
      <Modal
        wrapClassName='project-edit-modal'
        visible={this.state.visible}
        cancelText='取消'
        okText='确定'
        maskClosable={false}
        destroyOnClose
        title={this.state.id === 0 ? '添加项目' : row.title}
        onOk={_ => this.save()}
        onCancel={_ => this.hide()}
      >
        <Form>
          <FormItem {...formItemLayout} label='' style={{ margin: 0 }}>
            {
              getFieldDecorator('id', {
                initialValue: this.state.id,
                rules: [{ required: true }]
              })(<Input hidden />)
            }
          </FormItem>
          <FormItem {...formItemLayout} label='项目名称' >
            {
              getFieldDecorator('title', {
                initialValue: row.title || '',
                rules: [{ required: true, message: '请输入项目名称' }]
              })(<Input />)
            }
          </FormItem>
          <FormItem {...formItemLayout} label='主机' help='域名、IP，可带端口' >
            {
              getFieldDecorator('host', {
                initialValue: row.host || '',
                rules: [{ required: true, message: '请输入主机' }]
              })(<Input />)
            }
          </FormItem>
          <FormItem {...formItemLayout} label='协议类型'>
            {
              getFieldDecorator('schemes', {
                initialValue: 'http',
                rules: [{ required: true, message: '请输入协议类型' }]
              })(<Input disabled />)
            }
          </FormItem>
          <FormItem {...formItemLayout} label='请求前缀'>
            {
              getFieldDecorator('base_path', {
                initialValue: row.base_path || ''
              })(<Input />)
            }
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

const WrappedProjectEditModal = Form.create()(ProjectEditModal)

export default WrappedProjectEditModal
