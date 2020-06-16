// 入口函数
$(function () {

  // 表单验证
  var form= layui.form;
  form.verify({
    username: function(value, item){ //value：表单的值、item：表单的DOM对象
      if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
        return '用户名不能有特殊字符';
      }
      if(/(^\_)|(\__)|(\_+$)/.test(value)){
        return '用户名首尾不能出现下划线\'_\'';
      }
      if(/^\d+\d+\d$/.test(value)){
        return '用户名不能全为数字';
      }
    }
    
    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    ,pass: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ] 
  });   
  // 分析需求：
  // 1.注册登录按钮点击事件
  // 2.获取用户输入的信息
  // 3.发送ajax请求
  // 4.判断 如果请求成功 跳转首页

  // 1.注册登录按钮点击事件
  $("#btn-1").on("click", function (e) {
    // 阻止默认跳转
  
    e.preventDefault()
    // 2.获取用户输入的信息
    var fd = $("form").serialize();
    // 3.发送ajax请求
    $.ajax({
      type: "post",
      url: "http://ajax.frontend.itheima.net/api/login",
      data: fd,
      success: function (res) {
        console.log(res);
    // 4.判断 如果请求成功 跳转首页
      if(res.status==0){
        location.href='./index.html'
      }
         
      }
    });
   
  });


    // 注册按钮点击事件
    $('.links a').on('click',function(e){
      // 阻止默认跳转
      e.preventDefault();
      $('#heid').show().prev().hide();
   
    })

    $('#links a').on('click',function(e){
      // 阻止默认跳转
      e.preventDefault();
      $('#heid').hide().prev().show();
   
    })



     // 1.注册登录按钮点击事件
  $("#btn-2").on("click", function (e) {
    // 阻止默认跳转
  
    e.preventDefault()
    // 2.获取用户输入的信息
    var fd = $("#heid form").serialize();
    console.log(fd);
    
    // 3.发送ajax请求
    $.ajax({
      type: "post",
      url: "http://btapi.ehomespace.com/api/reguser",
      data: fd,
      success: function (res) {
        console.log(res);
        // alert(res.message)
        layer.msg(res.message);
    // 4.判断 如果请求成功 跳转首页
      if(res.status==0){
        $('#heid').hide().prev().show();
      }
         
      }
    });
   
  });


});




