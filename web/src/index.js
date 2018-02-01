import React from 'react'
import ReactDom from 'react-dom'
import { useStrict } from 'mobx'
import { Provider } from 'mobx-react'

import stores from 'stores'
import MainLayout from 'views/layout/MainLayout'

useStrict(true) // 开启严格模式，必须使用 @action 修改 state

ReactDom.render(
  (
    <Provider stores={stores}>
      <MainLayout />
    </Provider>
  )
  , document.getElementById('root')
)
