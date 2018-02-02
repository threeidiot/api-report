import { observable } from 'mobx'

import DocEdit from 'views/doc/DocEdit'
import ProjectDetail from 'views/project/ProjectDetail'

export default class RouteStore {
  @observable routes = [
    { name: '文档编辑', path: '/doc/edit', component: DocEdit },
    { name: '项目详情', path: '/project/:index', component: ProjectDetail }
  ]
}
