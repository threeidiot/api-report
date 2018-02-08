import React, { Component } from 'react'
import { Modal, Form, Input } from 'antd'

const FormItem = Form.Item

class ApiEditModal extends Component {
  constructor (props) {
    super(props)
    this.projectsStore = props.stores.projectsStore
    this.apisStore = props.stores.apisStore

    this.state = { visible: false }
  }

  show (id) {
    this.apisStore.setCurrId(id)
    this.setState({ visible: true })
  }

  hide () {
    this.setState({ visible: false })
  }

  save () {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.apisStore.saveRow(values).then(result => {
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
    const row = this.apisStore.row

    return (
      <Modal
        wrapClassName='api-edit-modal'
        visible={this.state.visible}
        cancelText='取消'
        okText='确定'
        maskClosable={false}
        destroyOnClose
        title={this.apisStore.currId === 0 ? '添加接口' : row.summary}
        onOk={_ => this.save()}
        onCancel={_ => this.hide()}
      >
        <Form>
          <FormItem {...formItemLayout} label='' style={{ margin: 0 }}>
            {
              getFieldDecorator('id', {
                initialValue: row.id
              })(<Input hidden />)
            }
          </FormItem>
          <FormItem {...formItemLayout} label='' style={{ margin: 0 }}>
            {
              getFieldDecorator('project_id', {
                initialValue: this.projectsStore.currId,
                rules: [{ required: true }]
              })(<Input hidden />)
            }
          </FormItem>
          <FormItem {...formItemLayout} label='接口摘要' >
            {
              getFieldDecorator('summary', {
                initialValue: row.summary || '',
                rules: [{ required: true, message: '请输入接口摘要' }]
              })(<Input />)
            }
          </FormItem>
          <FormItem {...formItemLayout} label='接口路径'>
            {
              getFieldDecorator('path', {
                initialValue: row.path || '',
                rules: [{ required: true, message: '请输入接口路径' }]
              })(<Input />)
            }
          </FormItem>
          <FormItem {...formItemLayout} label='请求类型'>
            {
              getFieldDecorator('method', {
                initialValue: row.method,
                rules: [{ required: true, message: '请输入请求类型' }]
              })(<Input />)
            }
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

const WrappedApiEditModal = Form.create()(ApiEditModal)

export default WrappedApiEditModal
