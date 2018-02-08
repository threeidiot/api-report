import { observable, action, computed } from 'mobx'
import * as api from '../helpers/api'

export default class ApisStore {
  @observable rows
  @observable currId

  constructor () {
    this.rows = new Map()
    this.currId = 0
  }

  @computed get sortedArrRows () {
    const sortedKeys = [...this.rows.keys()].sort((a, b) => b - a)
    let sortedRowsArr = []
    for (let k of sortedKeys) {
      sortedRowsArr.push(this.rows.get(k))
    }
    return sortedRowsArr
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

  @action async fetchRows (projectId) {
    const result = await api.get('/api/rows', { project_id: projectId })
    if (result) {
      this.rows = new Map()
      for (let row of result.rows) {
        this.rows.set(row.id, row)
      }
    }
    return result
  }

  @action async saveRow (params) {
    const result = await api.get('/api/edit', params)
    if (result) {
      this.rows.set(result.row.id, result.row)
    }
    return result
  }
}
