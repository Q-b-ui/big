$(function(){
// 使用layui提供的方法
var form=layui.form;
$.ajax({
    type:'get',
    url:'/my/userinfo',
    success:function(res){
        console.log(res);
        // 使用layui提供的方法，获取表单数据
        form.val('basicForm',res.data)
        
    }
})

    $('#form').submit(function(e){
        e.preventDefault();
        
        // 获取表单数据
        // 此时serializeArray的返回值是数组
        var fd=$(this).serializeArray();
        // console.log(fd);
        // 去掉username的 数据 （从数组中删除一个元素，先找到元素的索引，然后添加索引删除
        // 使用数组filter方法
        fd=fd.filter(function(item){
            // 如果名字不是username的数据就返回出去
            return item.name !=='username'
        })
        console.log(fd);//此时返回的数据是去掉username的数组

        // 发送ajax请求
        $.ajax({
            type:'post',
            url:'/my/userinfo',
            data:fd,
            success:function(res){
                // console.log(res);
                if(res.status==0){
                    // 使用layui提供的弹出提示
                    layer.msg(res.message)
                }
                
            }

        })
        

        
    })


})