import React, { Component } from 'react'
import { Modal, Form, Input } from 'antd'

const FormItem = Form.Item

class ProjectEditModal extends Component {
  constructor (props) {
    super(props)
    this.projectsStore = props.stores.projectsStore
    this.apisStore = props.stores.apisStore

    this.state = {
      visible: false
    }
  }

  show () {
    this.setState({ visible: true })
  }

  hide () {
    this.setState({ visible: false })
  }

  save () {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.projectsStore.saveRow(values).then(result => {
          this.setState({ visible: false })
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

    return (
      <Modal
        wrapClassName='project-edit-modal'
        visible={this.state.visible}
        cancelText='取消'
        okText='确定'
        maskClosable={false}
        destroyOnClose
        title={this.props.id === 0 ? '添加项目' : this.projectsStore.rows.get(this.props.id).title}
        onOk={_ => this.save()}
        onCancel={_ => this.hide()}
      >
        <Form>
          <FormItem {...formItemLayout} label='' >
            {
              getFieldDecorator('id', {
                initialValue: this.props.id,
                rules: [{ required: true }]
              })(<Input hidden />)
            }
          </FormItem>
          <FormItem {...formItemLayout} label='项目名称' >
            {
              getFieldDecorator('title', {
                initialValue: this.projectsStore.row.title || '',
                rules: [{ required: true, message: '请输入项目名称' }]
              })(<Input />)
            }
          </FormItem>
          <FormItem {...formItemLayout} label='主机' help='域名、IP，可带端口' >
            {
              getFieldDecorator('host', {
                initialValue: this.projectsStore.row.host || '',
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
                initialValue: this.projectsStore.row.base_path || ''
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
