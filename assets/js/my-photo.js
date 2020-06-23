$(function(){

 // 1、实现裁剪基本初始化效果
 var $image = $('.cropper-box img')
 var options = {
   // 纵横比
   aspectRatio: 1,
   // 指定预览区域
   preview: '.img-preview'
 }
 $image.cropper(options)

//  注册上传点击事件
$('#uploadImg').on('click',function(e){
    e.preventDefault();
    // 触发上传文件
    $('#selectImg').click();

})

//1.给file表单元素注册onchange事件
$('#selectImg').change(function (e) {
    //1.2 获取用户选择的图片
    var file = e.target.files[0];
    //1.3 将文件转为src路径
    var url = URL.createObjectURL(file);
    //1.4 将url路径赋值给img标签的src
    $image.cropper('destroy')//销毁之前的裁剪区域
    .attr('src',url)//更新图片路径
    .cropper(options)//生成新的裁剪区域
});


// 注册上传点击事件
$('#okbtn').on('click',function(){
    
    var ImgURL=$image.cropper('getCroppedCanvas', {
        width: 100,
        height: 100
      })
      .toDataURL('image/png')
      //将图片地址转成base64格式

    //   发送ajax请求
    $.ajax({
        type:'post',
        url:'/my/update/avatar',
        data:{
            avatar:ImgURL
        },
        success:function(res){
            console.log(res);
            
                if(res.status==0){
                    layer.msg(res.message)
                    window.parent.$.lodaing();
                }
        }
    })

})
      



})