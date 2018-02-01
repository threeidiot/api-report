import React from 'react'
import { Layout } from 'antd'
import { observer, inject } from 'mobx-react'

const { Header } = Layout

@inject('stores')
@observer
export default class TopHeader extends React.Component {
  render () {
    return (
      <Header style={{ background: '#fff', padding: 0, height: '46px' }}>
      </Header>
    )
  }
}
