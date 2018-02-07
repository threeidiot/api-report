import { observable } from 'mobx'

import DocEdit from 'views/doc/DocEdit'
import ProjectDetail from 'views/project/ProjectDetail'

export default class RouteStore {
  @observable routes = [
    { name: '项目详情', path: '/', component: ProjectDetail },
    { name: '项目详情', path: '/project/:id', component: ProjectDetail },
    { name: '文档编辑', path: '/doc/edit', component: DocEdit }
  ]
}
