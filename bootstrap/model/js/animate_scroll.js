// 封装一个得到当前网页被卷去距离的兼容函数
function getScroll() {
    return {
        left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
        top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    };
}

function animate_scroll(obj,target,callback){
    // 清除之前的定时器
    window.clearInterval( obj.timer );

    // 开启动画定时器
    obj.timer = window.setInterval(function(){
        // 缓慢动画
        // 步长值
        var speed = (target - getScroll().top )/10;
        // 步长值处理 正值向上取整 负值向下取整
        speed = speed >= 0 ? Math.ceil( speed ) : Math.floor( speed );


        // 判断是否到达了目标值
        if( getScroll().top == target ){
            // 运动到达目标值则清除定时器
            window.clearInterval( obj.timer );
            // 判断callback的值是否存在,存在则调用函数
            if( callback ){
                callback();
            }
            return;
        }
        window.scroll( 0 , getScroll().top + speed );
    },15)
}