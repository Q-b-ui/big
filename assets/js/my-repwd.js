$(function () {
       // 3.表单验证
    // 1.获取layui提供的方法
    var form = layui.form;
    form.verify({
      pill: function (value) {
        var password = $("#form input[name=oldPwd]").val();

        if (password == value) {
          return "新密码不能与原始密码一致！";
        }
      },
      same: function (value) {
        var pwd = $("#form input[name=newPwd]").val();

        if (pwd !== value) {
          return "两次输入的密码不一致！";
        }
      },
    });
  // 需求：
  // 注册表单提交事件
  $("#form").submit(function (e) {
    e.preventDefault();
    // 1.获取用户输入的密码
    var fd = $(this).serialize();
    console.log(fd);

    // 2.发送ajax请求

    $.ajax({
      type: "post",
      url: "/my/updatepwd",
      data: fd,
      success: function (res) {
        console.log(res);
        layer.msg(res.message);
     
        
      },
    });

 
  });
});
