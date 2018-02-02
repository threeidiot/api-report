import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject('stores')
@observer
export default class ProjectDetail extends Component {
  constructor (props) {
    super(props)
    this.projectsStore = props.stores.projectsStore
    this.projectsStore.setIndex(this.props.match.params.index)
  }

  componentDidUpdate () {
    this.projectsStore.setIndex(this.props.match.params.index)
  }

  componentDidMount () {
  }

  render () {
    const row = this.projectsStore.row

    return (
      <p>project title: {row.title}</p>
    )
  }
}
