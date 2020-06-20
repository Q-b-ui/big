// 通用接口调用设置
$(function(){

  // var baseURL = "http://ajax.frontend.itheima.net";
  var baseURL = "http://www.liulongbin.top:3007";

$.ajaxPrefilter(function (option) {
  // 在请求发送之前，触发beforeSend,开始调用进度条
  option.beforeSend = function () {
    // 加上window是为了防止报错
    window.NProgress && window.NProgress.start();
  };
  // 配置通用url
  option.url = baseURL + option.url;

  // 判断接口地址里是否含有'/my/'
  if (option.url.lastIndexOf("/my/") !== -1) {
    // 如果含有my,需要配置请求头
    option.headers = {
      Authorization: localStorage.getItem("mytoken"),
    };
  }

  // 3.处理通用获取数据异常
  option.complete = function (res) {
    console.log(res);
    
    // 结束进度条()
    window.NProgress && window.NProgress.done();
    // 3.1r如果获取数据失败
    if (
      res.responseJSON.status === 1 &&
      res.responseJSON.message === "身份认证失败！"
    ) {
      // 把无效的token清除
      localStorage.removeItem("mytoken");
      // 返回登录页
      location.href = "./login.html";
    }
  };
});

})

