import { observable, action, computed } from 'mobx'
import * as api from '../helpers/api'

export default class ProjectsStore {
  @observable rows
  @observable index

  constructor () {
    this.rows = []
    this.index = -1
  }

  @computed get row () {
    if (this.rows.length > 0 && this.rows.length > this.index) {
      return this.rows[this.index]
    }
    return {}
  }

  @action setIndex (i) {
    this.index = i
  }

  @action async fetchRows () {
    const result = await api.get('/project/rows')
    this.rows = result.rows
    this.index = this.rows.length > 0 ? 0 : -1

    return this.index
  }
}
