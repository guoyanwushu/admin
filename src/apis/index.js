/** axios 封装
 *
 */
import {Message} from 'element-ui'
import axios from 'axios'
const DEVELOP_BASEURL = 'http://yapi.demo.qunar.com/mock/22358/admin/'
const inst = axios.create({
  baseURL: process.env.NODE_ENV === 'development'?DEVELOP_BASEURL:'',     // baseURL需要根据环境来定
})
inst.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error)
})
inst.interceptors.response.use(function (res) {
  if (res.data) {
    const responseContent = res.data;
    if (responseContent.success) {
      return responseContent.content
    } else {
      Message({type: 'error', message: responseContent.message})
    }
  }
}, function (error) {
  return Promise.reject(error)
})
export default inst
