import { observable } from 'mobx'

import HomeIndex from 'views/home/HomeIndex'
import ProjectDetail from 'views/project/ProjectDetail'
import ApiDetail from 'views/api/ApiDetail'

export default class RouteStore {
  @observable routes = [
    { name: '首页', path: '/', component: HomeIndex },
    { name: '项目详情', path: '/project/:id', component: ProjectDetail },
    { name: '接口详情', path: '/project/:pid/api/:aid', component: ApiDetail }
  ]
}
