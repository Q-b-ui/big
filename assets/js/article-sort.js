$(function () {
  var form = layui.form;

  // 需求一：
  function foo() {
    // 页面一加载发送请求获取数据
    $.ajax({
      type: "get",
      url: "/my/article/cates",
      success: function (res) {
        if (res.status == 0) {
          var txt = template("temp", res);
          $("tbody").html(txt);
        }
      },
    });
  }
  foo();

  var addIndex = 0;

  // 需求二：
  // 1、注册点击添加文章按钮点击事件
  $("#add-btn").on("click", function (e) {
    e.preventDefault();
    addIndex = layer.open({
      title: "添加分类",
      type: 1,
      area: ["500px", "300px"],
      content: $("#test").html(),
    });
  });

  // 注册弹出添加页面表单提交事件
  $("body").on("submit", "#addform", function (e) {
    // 阻止默认提交行为
    e.preventDefault();
    var fd = $(this).serialize();

    // 发送ajax请求
    $.ajax({
      type: "post",
      url: "/my/article/addcates",
      data: fd,
      success: function (res) {
        if (res.status == 0) {
          // 弹出提示成功/失败
          layer.msg(res.message);
          // 关闭弹窗
          layer.close(addIndex);
          // 刷新页面
          foo();
        }
      },
    });
  });
  var editIndex = null;
  // 需求三：
  // 1、注册点击按钮 编辑  点击事件
  $("body").on("click", "#editbtn", function () {
    // 获取当前点击的按钮的id
    var id = $(this).data("id");
    console.log(id);

    // 发送ajax请求
    $.ajax({
      type: "get",
      url: "/my/article/cates/" + id,
      data: {
        id: id,
      },
      success: function (res) {
        console.log(res);
        
        // 2.弹出编辑框、
        editIndex = layer.open({
          title: "编辑分类",
          type: 1,
          area: ["500px", "300px"],
          content: $("#editText").html(),
        });
        $("#enitform input[name=name]").val(res.data.name);
        $("#enitform input[name=alias]").val(res.data.alias);
        $("#enitform input[name=Id]").val(res.data.Id);
        // form.val('enitform', res.data)
      },
    });
  });

  // 需求3.1;
  // 1.注册编辑按钮表单提交事件
  $("body").on("submit", "#enitform", function (e) {
    e.preventDefault();
    // 2.获取当前表单的数据
    var fd = $(this).serialize();
    //    发送ajax请求
    $.ajax({
        type:'post',
        url:'/my/article/updatecate',
        data:fd,
        success:function(res){
          //  弹出提示
            layer.msg(res.messgge);
            if(res.status==0){
              // 关闭弹窗
              layer.close(editIndex)
              // 刷新页面
              foo();
            }

        }

        
    })
  });

  // 需求4：
  // 1.注册删除·点击事件
  $('body').on('click','#del',function(e){
    // 阻止默认提交
    e.preventDefault();
    // 获取当前点击按钮的id
    var id=$(this).data('id');
    console.log(id);
    
    // 发送ajax请求
    $.ajax({
      type:'get',
      url:'/my/article/deletecate/'+id,
      data:{
        id:id
      },
      success:function(res){
        console.log(res);
        if(confirm('确定要删除吗！')){
          layer.msg(res.message);
          foo()

        }
        

      }
    })




  })
});
