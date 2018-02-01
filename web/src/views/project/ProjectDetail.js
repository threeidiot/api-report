import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject('stores')
@observer
export default class ProjectDetail extends Component {
  constructor (props) {
    super(props)
    this.projectStore = this.props.stores.projectStore
  }

  render () {
    return (
      <p>project detail { this.projectStore.row.name }</p>
    )
  }
}
