import React, { Component } from 'react'
import { Modal, Form, Input, Radio } from 'antd'

const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

class DefParamEditModal extends Component {
  constructor (props) {
    super(props)
    this.projectsStore = props.stores.projectsStore
    this.defParamsStore = props.stores.defParamsStore

    this.state = {
      id: 0,
      projectId: 0,
      visible: false
    }
  }

  show (id, projectId) {
    this.setState({ id, projectId, visible: true })
  }

  hide () {
    this.setState({ visible: false })
  }

  save () {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.defParamsStore.saveRow(values).then(result => {
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
    const row = this.defParamsStore.getRow(this.state.id)

    return (
      <Modal
        wrapClassName='def-param-edit-modal'
        visible={this.state.visible}
        cancelText='取消'
        okText='确定'
        maskClosable={false}
        destroyOnClose
        title={this.state.id === 0 ? '添加全局参数' : `编辑全局参数 - ${row.name}`}
        onOk={_ => this.save()}
        onCancel={_ => this.hide()}
      >
        <Form>
          <FormItem {...formItemLayout} label='' style={{ margin: 0 }} >
            {
              getFieldDecorator('id', {
                initialValue: this.state.id,
                rules: [{ required: true }]
              })(<Input hidden />)
            }
          </FormItem>
          <FormItem {...formItemLayout} label='' style={{ margin: 0 }}>
            {
              getFieldDecorator('project_id', {
                initialValue: this.state.projectId,
                rules: [{ required: true }]
              })(<Input hidden />)
            }
          </FormItem>
          <FormItem {...formItemLayout} label='参数名' >
            {
              getFieldDecorator('name', {
                initialValue: row.name || '',
                rules: [{ required: true, message: '请输入字段名' }]
              })(<Input />)
            }
          </FormItem>
          <FormItem {...formItemLayout} label='字段解释'>
            {
              getFieldDecorator('description', {
                initialValue: row.description || '',
                rules: [{ required: true, message: '请输入字段解释' }]
              })(<Input />)
            }
          </FormItem>
          <FormItem {...formItemLayout} label='类型'>
            {
              getFieldDecorator('type', {
                initialValue: row.type || '',
                rules: [{ required: true, message: '请输入类型' }]
              })(<Input />)
            }
          </FormItem>
          <FormItem {...formItemLayout} label='默认值'>
            {
              getFieldDecorator('default', {
                initialValue: row.default || ''
              })(<Input />)
            }
          </FormItem>
          <FormItem {...formItemLayout} label='是否必填'>
            {
              getFieldDecorator('required', {
                initialValue: row.required || 0,
                rules: [{ required: true, message: '请选择必填字段' }]
              })(
                <RadioGroup>
                  <RadioButton value={0}>非必填</RadioButton>
                  <RadioButton value={1}>必填</RadioButton>
                </RadioGroup>
                )
            }
          </FormItem>

          <FormItem {...formItemLayout} label='参数位置'>
            {
              getFieldDecorator('in', {
                initialValue: row.in || 'query',
                rules: [{ required: true, message: '请输入参数位置' }]
              })(<Input />)
            }
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

const WrappedDefParamEditModal = Form.create()(DefParamEditModal)

export default WrappedDefParamEditModal
