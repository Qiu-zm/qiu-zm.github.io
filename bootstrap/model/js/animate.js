// 动画函数封装
// 动画函数参数有是三个
// 第一个是obj,必选,需要做动画的对象
// 第二个是target,必选,目标值
// 第三个是callback,可选,动画执行完毕以后需要执行的回调函数
function animate(obj,target,callback){
    // 清除之前的定时器
    window.clearInterval( obj.timer );

    // 开启动画定时器
    obj.timer = window.setInterval(function(){
        // 缓慢动画
        // 步长值
        var speed = (target - obj.offsetLeft )/10;
        // 步长值处理 正值向上取整 负值向下取整
        speed = speed >= 0 ? Math.ceil( speed ) : Math.floor( speed );


        // 判断是否到达了目标值
        if( obj.offsetLeft == target ){
            // 运动到达目标值则清除定时器
            window.clearInterval( obj.timer );
            // 判断callback的值是否存在,存在则调用函数
            if( callback ){
                callback();
            }
            return;
        }
        obj.style.left = obj.offsetLeft + speed + "px";
    },15)
}