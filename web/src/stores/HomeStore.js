import { observable, action } from 'mobx'
import * as api from '../helpers/api'

export default class HomeStore {
  @observable data

  constructor () {
    this.data = {}
  }

  @action async fetchData () {
    const result = await api.get('/home/info')
    if (result) {
      this.data = result
    }
    return result
  }
}
