import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'mobx-react'

import stores from 'stores'
import MainLayout from 'views/layout/MainLayout'

ReactDom.render(
  (
    <Provider stores={stores}>
      <MainLayout />
    </Provider>
  )
  , document.getElementById('root')
)
