import { observable } from 'mobx'

import HomeIndex from 'views/home/HomeIndex'
import ProjectDetail from 'views/project/ProjectDetail'
import ApiDetail from 'views/api/ApiDetail'
import DefParamDetail from 'views/param/DefParamDetail'

export default class RouteStore {
  @observable routes = [
    { name: '首页', path: '/', component: HomeIndex },
    { name: '项目详情', path: '/project/:id', component: ProjectDetail },
    { name: '接口详情', path: '/project/:pid/api/:aid', component: ApiDetail },
    { name: '全局参数', path: '/project/:id/param', component: DefParamDetail }
  ]
}
