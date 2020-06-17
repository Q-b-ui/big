$(function(){
    // 判断token是否存在
var mytoken=localStorage.getItem('mytoken');
if(!mytoken){
    //不存在就跳转登录页面
    location.href='./login.html'
}

// 首页需求：
// 1.页面一加载就发送ajax请求
// 2.获取数据渲染页面

// 1.页面一加载就发送ajax请求
function lodaing(){
    $.ajax({
        type:'get',
        url:'http://ajax.frontend.itheima.net/my/userinfo',
        headers:{
            // 凡是带my的请求，都需要设置请求头，携带登录成功的标志
            Authorization:localStorage.getItem('mytoken')
        },
        success:function(backData){
        // 2.获取数据渲染页面
         console.log(backData);
        //  获取成功
         if(backData.status==0){
           $('#welcome-username').text(backData.data.username);
           $('#uname').text(backData.data.username);
        //    判断是否获取了照片
        if(backData.data.user_pic){
            // 获取到照片 就删除默认的照片，动态添加数据库里的照片
            $('#welcome-username').parent().siblings('div').remove();
            $('#welcome-username').parent().prepend('<img src="'+backdata.data.user_pic+'" class="layui-nav-img">')
        }
         }
        }
    })
}
 lodaing();

// 点击退出
 $('#quit-btn').on('click',function(){
    layer.confirm('确定要退出吗?', {icon: 3, title:'提示'}, function(index){
        //  清除登录信息
    localStorage.removeItem('mytoken');
        
        layer.close(index);
            // 返回登录页面
    location.href='./login.html'
      });
   

 })










})