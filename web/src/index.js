import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'mobx-react'

import stores from 'stores'
import MainLayout from 'views/layout/MainLayout'

import './global.scss'

ReactDom.render(
  (
    <Provider stores={stores}>
      <MainLayout />
    </Provider>
  )
  , document.getElementById('root')
)
