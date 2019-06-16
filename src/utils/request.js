import Vue from 'vue'
import axios from 'axios'
import { Vueaxios } from './axios'
import store from '@/store'
import { getToken } from '@/utils/token'
import Message from 'ant-design-vue/es/message'
import Notification from 'ant-design-vue/es/notification'

// create an axios instance
const request = axios.create({
  baseURL: 'http://172.19.0.60:8080', // api 的 base_url
  withCredentials: true, // 跨域请求时发送 cookies
  timeout: 15000 // request timeout
})

// request interceptor
request.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (getToken()) {
      // 让每个请求携带token-- ['token']为自定义key 请根据实际情况自行修改
      config.headers['token'] = getToken()
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
request.interceptors.response.use(
  /**
   * If you want to get information such as headers or status
   * Please return  response => response
   */
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 XMLHttpRequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    const res = response.data
    if (res.code !== 200) {
      Notification.warning({ message: res.msg })

      if (res.code === 50001 || res.code === 50002 || res.code === 50004) {
        console.log(response)
        store.dispatch('FedLogout').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug

          Notification.warning({ message: res.msg })
        })
      }
      return Promise.reject('error')
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Notification.warning({ message: '' + error })
    return Promise.reject(error)
  }
)

export default request
