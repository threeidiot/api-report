import RouteStore from './RouteStore'
import ProjectsStore from './ProjectsStore'
import ApisStore from './ApisStore'
import ParamsStore from './ParamsStore'

export default {
  routeStore: new RouteStore(),
  projectsStore: new ProjectsStore(),
  apisStore: new ApisStore(),
  paramsStore: new ParamsStore()
}
