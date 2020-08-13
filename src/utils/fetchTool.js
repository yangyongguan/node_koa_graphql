import qs from 'qs'
import fetch from 'node-fetch'
const BASE_URL = 'https://test-zhike1.vhall.com/webinar/api'
const defaultOptions = {
  timeout: 20000,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
}

class $Http {
  constructor () {
    this.config = {}
    this.options = {}
  }
  $config (config = {}) {
    this.config = config
    if (this.config.headers) {
      this.options.headers = this.config.headers
    }
    return this
  }
  $get (url, data = {}) {
    this.options.method = 'get'
    this.options.data = data
    return this.$fetch(url)
  }
  $post (url, data = {}) {
    this.options.method = 'post'
    // this.options.data = qs.stringify(data)
      this.options.data = data
    return this.$fetch(url)
  }
  $fetch (url) {
    this.options.url = url
    if (!~url.indexOf('http')) {
      this.options.url = BASE_URL + url
    }
    return new Promise((resolve, reject) => {
      if (this.options.method === 'get') {
        if (this.options.data) {
          let params = ''
          Object.keys(this.options.data).forEach((key) => {
            params += `${key}=${this.options.data[key]}&`
          })
          params = params.substring(0, params.length - 1)
          if (!~url.indexOf('?')) {
            this.options.url = this.options.url + '?' + params
          } else {
            this.options.url = this.options.url + params
          }
        }
        fetch(this.options.url, {
          method: this.options.method,
          credentials: 'include'
        }).then((response) => {
          return response.json()
        }).then(res => {
          if (res.code === 200) {
            resolve(res)
          } else {
            reject(res)
          }
        }).catch((error) => {
            reject(error)
        })
      } else {
        return fetch(this.options.url, {
          method: this.options.method,
          headers: defaultOptions.headers,
          body: this.options.data,
          credentials: 'include'
        }).then((response) => {
          return response.json()
        }).then((res) => {
          if (res.code === 200) {
            resolve(res)
          } else {
            reject(res)
          }
        })
      }
    })
  }
}

export default {
  $get (url, data, config = { loading: false, mack: false }) {
    let http = new $Http()
    return http.$config(config).$get(url, data)
  },
  $post (url, data, config = { loading: false, mack: false }) {
    let http = new $Http()
    return http.$config(config).$post(url, data)
  }
}
