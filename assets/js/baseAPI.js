$.ajaxPrefilter(function(options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url

    //统一设置请求头
    if(options.url.indexOf('/my') !== -1){
        options.headers ={
          Authorization:localStorage.getItem('token') || ''
    }
}

  // 3. 全局挂载 complete 回调函数，每当请求完成以后，都进行拦截
  options.complete = function(res) {
    // 3.1 判断身份认证是否失败
    if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
      // 3.2 如果身份认证失败，则清空本地存储的 token 和 user 信息
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      // 3.3 重定向到登录页面
      // 通过 window.parent 获取到父窗口对象
      location.href = '/login.html'
    }
  }
})
