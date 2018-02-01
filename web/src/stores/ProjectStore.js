import { observable } from 'mobx'

export default class ProjectStore {
  @observable row = {
    id: 1,
    name: '测试1'
  }
}
