import { observable, action, computed } from 'mobx'
import * as api from '../helpers/api'

export default class ApisStore {
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

  @action async fetchRows (projectId) {
    const result = await api.get('/api/rows', {
      project_id: projectId
    })
    this.rows = result.rows

    return this.rows
  }
}
