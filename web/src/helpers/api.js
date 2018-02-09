import { message } from 'antd'
import queryString from 'query-string'

function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  const errorMsg = `${response.status}: ${response.statusText}`
  const error = new Error(errorMsg)
  error.response = response
  message.error(`服务端异常: ${errorMsg}`)
  throw error
}

async function request (url, options) {
  const response = await window.fetch('/v1' + url, {
    ...options,
    credentials: 'include' // 包含cookie
  })

  checkStatus(response)

  const data = await response.json()
  if (data.status === 'error') {
    message.error(data.message)
  }

  if (data.status === 'success') {
    return data.result
  }

  return false
}

export async function get (url, params = {}, options = {}) {
  console.log('get api: ', url, params)
  const query = queryString.stringify(params)
  const result = await request(`${url}?${query}`, options)
  return result
}

export async function post (url, params = {}, options = {}) {
  const formData = new window.FormData()

  Object.keys(params).map((key) => {
    formData.append(key, params[key])
  })
  console.log('post api: ', url, params)
  const result = request(url, {
    method: 'POST',
    body: formData,
    ...options
  })
  return result
}
