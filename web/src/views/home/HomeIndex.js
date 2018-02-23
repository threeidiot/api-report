import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Card, Row, Col } from 'antd'

@inject('stores')
@observer
export default class HomeIndex extends Component {
  constructor (props) {
    super(props)
    this.homeStore = this.props.stores.homeStore
  }

  componentDidMount () {
    this.homeStore.fetchData()
  }

  render () {
    return (
      <div className='home-index'>
        <Row gutter={16}>
          <Col span={6}>
            <Card title='项目总数'>
              <p>共有 {this.homeStore.data.project_cnt} 个项目</p>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
