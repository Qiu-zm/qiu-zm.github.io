//动画函数封装
//动画函数参数有三个
//obj  必选  做动画的对象
//target  必选  目标值
//callback   动画执行完毕后需要执行的回调函数
function animate( obj , target , callback ){
    // window.clearInterval( obj.timer );

    //开启定时器
    obj.timer = window.setInterval(function(){

        //缓慢动画
        //步长值

        // var speed = ( target - obj.offsetLeft )/10;
        //步长值处理  正值向上取整  负值向下取整
        // speed = speed >= 0 ? Math.ceil( speed ) : Math.floor( speed );
        
        //判断是否到达了目标值
        // if( obj.offsetTop == target ){
            //到达则清除定时器
            // window.clearInterval( obj.timer );
            //判断callback是否传入
            // if( callback ){
                // callback();
            // }
            // return
        // }
        obj.style.Top = obj.offsetTop + 1 + "px";
    } , 15 )
}