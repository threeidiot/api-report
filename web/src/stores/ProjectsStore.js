import { observable, action, computed } from 'mobx'
import * as api from '../helpers/api'

export default class ProjectsStore {
  @observable rows
  @observable currId
  @observable isFetchRows

  constructor () {
    this.rows = new Map()
    this.currId = 0
    this.isFetchRows = false
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
      this.isFetchRows = true
    }
    return result
  }

  @action prepareData (pid) {
    this.setCurrId(pid)
    if (this.isFetchRows === false) {
      this.fetchRows()
    }
  }

  @action async saveRow (params) {
    const result = await api.get('/project/edit', params)
    if (result) {
      this.rows.set(result.row.id, result.row)
    }
    return result
  }
}
