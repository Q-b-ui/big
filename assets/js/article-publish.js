$(function(){

    var form=layui.form;
      // 初始化富文本编辑器
  initEditor()

//   图片裁剪区域js
  // 1、实现裁剪基本初始化效果
  var $image = $('.cropper-box img')
  var options = {
    // 纵横比
    aspectRatio: 400/280,
    // 指定预览区域
    preview: '.img-preview'
  }
  $image.cropper(options)

//   注册选择封面点击事件
$('#select-img').on('click',function(e){
    e.preventDefault();
    // 触发选择图片表单点击事件
    $('#cover_img').click();
});

//1.给file表单元素注册onchange事件
$('#cover_img').change(function () {
    //1.2 获取用户选择的图片
    var file = this.files[0];
    //1.3 将文件转为src路径
    var url = URL.createObjectURL(file);
    //1.4 将url路径赋值给img标签的src
    $image.cropper('destroy')
    .attr('src', url)
    .cropper(options)
});


//   选择文章分类js文件
    $.ajax({
        type:'get',
        url:'/my/article/cates',
        success:function(res){
            // console.log(res);
            var list=template('templist',res)
            $('#select-list').html(list)
            form.render("select");
            
        }
    })
    var state='';
    // 注册发布和存为草稿按钮点击事件
    $('.layui-btn').on('click',function(){
        var type=$(this).data('type');
        if(type=="pub"){
            state="已发布"
        }else if(type=="draft")
            state="草稿"
    })

    // 注册表单提交事件
    $('#add-form').on('submit',function(e){
        // 阻止默认提交
        e.preventDefault();
        $image.cropper('getCroppedCanvas', {
            width: 400,
            height: 280
          }).toBlob(function(blob){//将图片转换成

              // 获取表单数据
            var fd=new FormData(document.querySelector('#add-form'));
            fd.append("state",state);
            fd.append("cover_img",blob);
    
            $.ajax({
                type:'post',
                url:'/my/article/add',
                data:fd,
                contentType:false,
                processData:false,
                success:function(res){
                    console.log(res);
                    if(res.status==0){
                        // 弹出提示
                        layer.msg(res.message)
                    }
                    
                }
            })
          })
        

        


    })
    
})