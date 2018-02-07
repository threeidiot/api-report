import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject('stores')
@observer
export default class HomeIndex extends Component {
  constructor (props) {
    super(props)
    this.projectsStore = this.props.stores.projectsStore
  }

  render () {
    return (
      <p>首页 占位页面</p>
    )
  }
}
