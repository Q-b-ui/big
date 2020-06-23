$(function () {
  // 使用layui提供的方法
  var form = layui.form;

  // 补零函数
  function addZero(n) {
    return n < 10 ? "0" + n : n;
  }
  // 处理日期的格式化： 基于模板引擎的过滤器
  template.defaults.imports.formDate = function (data) {
    // 实现日期的格式化：把参数data日期字符串转换为日期对象
    var d = new Date(data);
    var year = d.getFullYear();
    var month = addZero(d.getMonth() + 1);
    var day = addZero(d.getDate());
    var hour = addZero(d.getHours());
    var minutes = addZero(d.getMinutes());
    var seconds = addZero(d.getSeconds());
    // return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds
    return year + "-" + month + "-" + day;
  };
  function list(param) {
    // 发送ajax请求获取文章列表
    $.ajax({
      type: "get",
      url: "/my/article/list",
      data: param,
      success: function (res) {
        //   console.log(res);

        var tags = template("temp-list", res);
        // 添加到列表tbody中
        $(".layui-table tbody").html(tags);
      },
    });
  }
  // 调用一次
  list({
    // 页码从1开始
    pagenum: 1,
    // 每页显示10项数据
    pagesize: 10,
  });

  // 文章分类下拉选项

  function select() {
    // 发送ajax请求获取分类
    $.ajax({
      type: "get",
      url: "/my/article/cates",
      success: function (res) {
        // 使用模板引擎
        var tage = template("temp-select", res);
        // 添加列表渲染页面
        $("#category").html(tage);
        // 更新渲染select (使用layui的规则)
        form.render("select");
      },
    });
  }
  // 调用一次
  select();

  // 注册表单提交事件、
  $("#search-form").submit(function (e) {
    //    阻止默认提交
    e.preventDefault();
    // 获取表单数据
    var fd = $(this).serializeArray();
    console.log(fd);
    var params = {
      // 页码从1开始
      pagenum: 1,
      // 每页显示10项数据
      pagesize: 10,
    };

    // 遍历表单的数据
    fd.forEach(function (item) {
      // 向params动态添加属性
      params[item.name] = item.value;
    });
    // 刷新列表
    list(params);
  });

  //   注册点击删除事件
  $("body").on("click", ".delete", function (e) {
    e.preventDefault();
    // 获取当前点击的按钮下的id
    var id = $(this).data("id");

    var index = layer.confirm("确定要删除吗！", function () {
      // 发送ajax请求删除数据
      $.ajax({
        type: "get",
        url: "/my/article/delete/" + id,
        data: {
          id: id,
        },
        success: function (res) {
          if (res.status == 0) {
            //   删除成功
            // 关闭弹窗
            layer.close(index);
            // 调用函数刷新页面
            list({
              // 页码从1开始
              pagenum: 1,
              // 每页显示10项数据
              pagesize: 10,
            });
          }
        },
      });
    });
  });

//   点击编辑
 $('body').on('click','#bianji',function(e){
     e.preventDefault();
             // 跳转页面
             window.location.href="./article-publish.html"
     var id=$(this).data('id');
    //  发送ajax请求
    $.ajax({
        type:'get',
        url:'/my/article/'+id,
        data:{
            id:id
        },
        success:function(res){
            console.log(res);
          
           if(res.status==0){
        
            // form.val('#add-form',res.data)
            $('#add-form input[name=title]').val(res.data.title)
            console.log($('#add-form input[name=title]'));
           }
            
        }
    })
     
 })
});
