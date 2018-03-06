import React from 'react'
import { Tag, Badge, Modal, Form, Input, Tooltip, Icon } from 'antd'
import { observer, inject } from 'mobx-react'
import './ActiveProject.scss'

const FormItem = Form.Item

@inject('stores')
@observer
class ActiveProject extends React.Component {
  constructor (props, context) {
    super(props)
    this.projectsStore = this.props.stores.projectsStore
    this.apisStore = this.props.stores.apisStore

    this.state = {
      visible: false,
      isSetTmpHost: false,
      scheme: 'http',
      host: '',
      bashPath: ''
    }
  }

  componentWillReceiveProps (props) {
    const id = props.activeProjectId
    let tmpHost = window.localStorage.getItem(this.getPersistKey(id))
    if (tmpHost) {
      tmpHost = JSON.parse(tmpHost)
      this.setState(tmpHost)
    }
  }

  getPersistKey (id) {
    return `tmp-host-${id}`
  }

  getHostTag () {
    const project = this.projectsStore.row
    let tmpHost = window.localStorage.getItem(this.getPersistKey(project.id))
    if (tmpHost) {
      tmpHost = JSON.parse(tmpHost)
      const fullHost = `${tmpHost.scheme}://${tmpHost.host}${tmpHost.basePath}`
      return <Tag color='volcano'>{fullHost}</Tag>
    }
    const fullHost = `${project.schemes}://${project.host}${project.base_path}`
    return <Tag color='blue'>{fullHost}</Tag>
  }

  getTmpHostOpBtn () {
    if (this.state.isSetTmpHost) {
      return <a href='#' onClick={e => this.clearTmpHost(e)}>清除调试地址</a>
    } else {
      return <a href='#' onClick={e => this.openModal(e)}>设置调试地址</a>
    }
  }

  clearTmpHost (e) {
    e.preventDefault()
    const project = this.projectsStore.row
    window.localStorage.removeItem(this.getPersistKey(project.id))
    this.setState({
      isSetTmpHost: false,
      scheme: 'http',
      host: '',
      bashPath: ''
    })
  }

  openModal (e) {
    e.preventDefault()
    this.setState({ visible: true })
  }

  save () {
    const project = this.projectsStore.row
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.isSetTmpHost = true
        window.localStorage.setItem(this.getPersistKey(project.id), JSON.stringify(values))
        this.setState({
          ...values,
          visible: false
        })
      }
    })
  }

  hide () {
    this.setState({ visible: false })
  }

  render () {
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 }
    }
    const project = this.projectsStore.row
    const { getFieldDecorator } = this.props.form

    return (
      <div className='active-project'>
        <h3><Badge status='success' text={project.title} /></h3>
        <div className='tmp-host'>
          {this.getHostTag()}
          {this.getTmpHostOpBtn()}
          <Tooltip placement='right' title={'本地修改 API 访问地址，不影响其他用户，方便调试'}>
            &nbsp;<Icon type='question-circle-o' />
          </Tooltip>
        </div>

        <Modal
          wrapClassName='tmp-host-modal'
          visible={this.state.visible}
          cancelText='取消'
          okText='确定'
          maskClosable={false}
          destroyOnClose
          title='设置调试地址'
          onOk={_ => this.save()}
          onCancel={_ => this.hide()}
        >
          <FormItem {...formItemLayout} label='主机' help='域名、IP，可带端口' >
            {
              getFieldDecorator('host', {
                initialValue: this.state.host || '',
                rules: [{ required: true, message: '请输入主机' }]
              })(<Input />)
            }
          </FormItem>
          <FormItem {...formItemLayout} label='协议类型'>
            {
              getFieldDecorator('scheme', {
                initialValue: this.state.scheme,
                rules: [{ required: true, message: '请输入协议类型' }]
              })(<Input />)
            }
          </FormItem>
          <FormItem {...formItemLayout} label='请求前缀'>
            {
              getFieldDecorator('basePath', {
                initialValue: this.state.basePath || ''
              })(<Input />)
            }
          </FormItem>
        </Modal>
      </div>
    )
  }
}

const WrappedActiveProject = Form.create()(ActiveProject)

export default WrappedActiveProject
