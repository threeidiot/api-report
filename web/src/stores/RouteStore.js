import { observable } from 'mobx'

import HomeIndex from 'views/home/HomeIndex'
import ProjectDetail from 'views/project/ProjectDetail'

export default class RouteStore {
  @observable routes = [
    { name: '首页', path: '/', component: HomeIndex },
    { name: '项目详情', path: '/project/:id', component: ProjectDetail }
  ]
}
