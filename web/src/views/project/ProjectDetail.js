import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject('stores')
@observer
export default class ProjectDetail extends Component {
  constructor (props) {
    super(props)
    this.projectsStore = props.stores.projectsStore
  }

  componentWillReceiveProps (props) {
    this.projectsStore.setIndex(props.match.params.index)
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
