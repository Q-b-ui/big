// 入口函数
$(function () {
  // 表单验证
  // layui是全局对象，通过它可以得到form对象
  var form = layui.form
  // 基于LayUI自定义表单验证规则
  form.verify({
    // 必须是6-8位字符,不包括空格
    uname: [/^[\S]{6,8}$/, '用户名必须是6-8位字符'],
    // 密码必须是6位数字
    pwd: function (value, item) {
      // 形参value标书对应输入域的值
      // item表示DOM元素
      // 验证6位数字
      var reg = /^\d{6}$/
      // 如果规则不匹配就返回提示
      if (!reg.test(value)) {
        return '密码必须是6位数字'
      }
    },
    // 验证确认密码必须和原有密码一致
    same: function (value) {
      // 获取原始密码
      var pwd = $('#backform input[name=password]').val()
      if (pwd !== value) {
        return '两次输入的密码必须一致'
      }
    }
  })
  // 分析需求：
  // 1.注册登录按钮点击事件
  // 2.获取用户输入的信息
  // 3.发送ajax请求
  // 4.判断 如果请求成功 跳转首页

  // 1.注册登录按钮点击事件
  $("#loginform").submit(function (e) {
    // 阻止默认跳转

    e.preventDefault();
    // 2.获取用户输入的信息
    var fd = $(this).serialize();
    // 3.发送ajax请求
    $.ajax({
      type: "post",
      url: "http://ajax.frontend.itheima.net/api/login",
      data: fd,
      success: function (res) {
        console.log(res);
        layer.msg(res.message)
        // 4.判断 如果请求成功 跳转首页
        if (res.status == 0) {
          // 携带登录成功标志
          localStorage.setItem("mytoken", res.token);
          // 跳转到主页
          location.href = "./index.html";
        }
      },
    });
  });



  // 注册按钮点击事件
  $(".links a").on("click", function (e) {
    // 阻止默认跳转
  e.preventDefault()
   
   $('#backform').show();
   $('#loginform').hide();
  });

  $("#links a").on("click", function (e) {
    // 阻止默认跳转
   e.preventDefault()
    $('#backform').hide();
    $('#loginform').show();
    
  });

  // 1.注册按钮点击事件
  $("#backform").submit(function (e) {
    // 阻止默认跳转

    e.preventDefault();
    // 2.获取用户输入的信息
    var formData = $(this).serialize();
   console.log(formData);
   

    // 3.发送ajax请求
    $.ajax({
      type: 'post',
      url: 'http://ajax.frontend.itheima.net/api/reguser',
      data: formData,
      success: function (backData) {
        console.log(backData);
        layer.msg(backData.message)
        // 4.
        if (backData.status == 0) {
          $("#links a").click();
          layer.msg(backData.message)
        }else{
          layer.msg(backData.message)
         
        }
      },
    });
  });
});
