import RouteStore from './RouteStore'
import HomeStore from './HomeStore'
import ProjectsStore from './ProjectsStore'
import ApisStore from './ApisStore'
import ParamsStore from './ParamsStore'
import DefParamsStore from './DefParamsStore'

export default {
  routeStore: new RouteStore(),
  homeStore: new HomeStore(),
  projectsStore: new ProjectsStore(),
  apisStore: new ApisStore(),
  paramsStore: new ParamsStore(),
  defParamsStore: new DefParamsStore()
}
