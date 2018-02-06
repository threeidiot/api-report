import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { HashRouter as Router, Route } from 'react-router-dom'
import { Layout } from 'antd'

import LeftSider from './LeftSider'
import TopHeader from './TopHeader'
import './MainLayout.scss'

const { Content, Footer } = Layout

@inject('stores')
@observer
export default class MainLayout extends Component {
  constructor (props) {
    super(props)
    this.routeStore = this.props.stores.routeStore
  }

  getRouteListHtml (routes) {
    let routeListHtml = []
    routes.map((r, i) => {
      const uniqueKey = i.toString()
      if (r.component) {
        routeListHtml.push(<Route key={uniqueKey} path={r.path} component={r.component} exact history />)
      }
    })
    return routeListHtml
  }

  render () {
    return (
      <Router>
        <div className='main-layout'>
          <Layout>
            <LeftSider />

            <Layout>
              <TopHeader />

              <Content className='content'>
                {this.getRouteListHtml(this.routeStore.routes)}
              </Content>

              <Footer>©2018 created by threeidiot technical team</Footer>
            </Layout>

          </Layout>
        </div>
      </Router>
    )
  }
}
