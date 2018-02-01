import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject('stores')
@observer
export default class DocEdit extends Component {
  constructor (props) {
    super(props)
    this.projectStore = this.props.stores.projectStore
  }

  render () {
    return (
      <p>doc edit { this.projectStore.row.id }</p>
    )
  }
}
