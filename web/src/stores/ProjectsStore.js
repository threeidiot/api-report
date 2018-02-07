import { observable, action, computed } from 'mobx'
import * as api from '../helpers/api'

export default class ProjectsStore {
  @observable rows
  @observable currId

  constructor () {
    this.rows = new Map()
    this.currId = 0
  }

  @computed get sortedKeys () {
    const sortedKeys = [...this.rows.keys()].sort((a, b) => b - a)
    return sortedKeys
  }

  @computed get row () {
    if (this.rows.has(this.currId)) {
      return this.rows.get(this.currId)
    }
    return {}
  }

  @action setCurrId (id) {
    this.currId = id
  }

  @action async fetchRows () {
    const result = await api.get('/project/rows')
    if (result) {
      for (let row of result.rows) {
        this.rows.set(row.id, row)
      }
    }
    return result
  }

  @action async saveRow (params) {
    const result = await api.get('/project/edit', params)
    if (result) {
      this.rows.set(result.row.id, result.row)
    }
    return result
  }
}
