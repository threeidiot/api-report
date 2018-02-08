import { observable, action, computed } from 'mobx'
import * as api from '../helpers/api'

export default class ParamsStore {
  @observable rows

  constructor () {
    this.rows = new Map()
  }

  @computed get sortedArrRows () {
    const sortedKeys = [...this.rows.keys()].sort((a, b) => b - a)
    let sortedRowsArr = []
    for (let k of sortedKeys) {
      sortedRowsArr.push(this.rows.get(k))
    }
    return sortedRowsArr
  }

  getRow (id) {
    if (this.rows.has(id)) {
      return this.rows.get(id)
    }
    return {}
  }

  @action async fetchRows (apiId) {
    const result = await api.get('/param/rows', { api_id: apiId })
    if (result) {
      this.rows = new Map()
      for (let row of result.rows) {
        this.rows.set(row.id, row)
      }
    }
    return result
  }

  @action async saveRow (params) {
    const result = await api.get('/param/edit', params)
    if (result) {
      this.rows.set(result.row.id, result.row)
    }
    return result
  }
}
