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
    const r = this.rows[this.index]
    return r || {}
  }

  @action setIndex (i) {
    this.index = i
  }

  @action async fetchRows () {
    const result = await api.get('/project/rows')
    this.rows = result.rows
  }
}
