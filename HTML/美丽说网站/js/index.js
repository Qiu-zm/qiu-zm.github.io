  //保存最原始图片序列
  var imgindex = $(".banner ul").children().attr("title", function (index) {
    return index
})

//封装下一页动画
function nextpage() {
    $(".banner ul").animate({
        left: "-1200px"
    }, 1000, function () {
        $(".banner ul").children().first().appendTo(".banner ul").parent().css("left", 0)

    })
}

//封装上一页的方法
function prevpage() {
    $(".banner ul").children().first().before(function () {
        return $(".banner ul").children().last()
    })
    $(".banner ul").css("left", "-1200px").animate({
        "left": "0"
    }, 1000)
}

//封装点击上下页的方法
function lbimg() {
    
    // $("元素").attr("属性","属性值")
    //判断
    if ($(this).attr("class").indexOf("next") != -1) {
        //点击下一页要执行的操作

        //获取当前图片的title
        var bannerindex = $(".banner ul").children().first().attr("title")
        //超出范围重置下标
        var berindex = ++bannerindex > $(".banner ul").children().length-1 ? 0 : bannerindex;
        //获取下一张图片的title值,按照title匹配原始序列图片并添加到当前图片的后面
        imgindex.eq(berindex).insertAfter($(".banner ul").children().first())
        //给相同下标得小点点添加高亮,并移除其兄弟的高亮
        $("ol li").eq(berindex).addClass("active").siblings().removeClass("active")
        //根据上面排列到的执行下一页动画
        //下一页
        nextpage()

    } else {

        //获取当前显示图片的下标
        var bannerindex = $(".banner ul").children().first().attr("title")
        //进行范围重置
        var berindex = --bannerindex < 0 ? $(".banner ul").children().length-1 : bannerindex;

        //给当前小点点添加高亮,并移除其他兄弟类高亮
        $("ol li").eq(berindex).addClass("active").siblings().removeClass("active")

        //获取当前图片title减一的下标.匹配原来顺序的图片,添加到当前序列的最后面,让下一页动画执行
        imgindex.eq(berindex).insertAfter($(".banner ul").children().last())

        //根据上面排列到的执行上一页动画
        //上一页
        prevpage()


    }
}

// 小点点的点击事件
// $("ol li").click(function () {
function olli() {

    //给点击的小点点
    $(this).addClass("active").siblings().removeClass("active")
    //当前点击小点点的序号
    var olsindex = $(this).index();
    //当前第一张图片的title
    var bannerindex = $(".banner ul").children().first().attr("title")
    console.log(bannerindex, olsindex)
    //点击小点点是从左边还是右边出来
    if (bannerindex == olsindex) {
        //点击相同的小点点不执行
        return;
    } else if (bannerindex < olsindex) {
        //点击当前小点点后面的点点执行方法
        //追加选中图片到当前图片后面
        $(".banner ul").children().eq(olsindex).insertAfter($(".banner ul").children().first())
        imgindex.eq(olsindex).insertAfter($(".banner ul").children().first())

        //执行下一张动画
        nextpage()

    } else {
        imgindex.eq(olsindex).insertAfter($(".banner ul").children().last())

        prevpage()
        
    }

}

//节流
//一定时间内连续点击只执行一次
//非立即执行
// var throttle = function (func, delay) {
//     var timer = null;
//     return function () {
//         var context = this;
//         var args = arguments;
//         if (!timer) {
//             timer = setTimeout(function () {
//                 func.apply(context, args);
//                 timer = null;
//             }, delay);
//         }
//     }
// }

//立即执行函数
function throttle(func, wait) {
    let previous = 0;
    return function () {
        let now = Date.now();
        let context = this;
        let args = arguments;
        if (now - previous > wait) {
            func.apply(context, args);
            previous = now;
        }
    }
}

$(".cutBanner").click(throttle(lbimg, 1050));
$("ol li").click(throttle(olli, 1050));
var inter =  setInterval(function(){
    //获取当前图片的title
    var bannerindex = $(".banner ul").children().first().attr("title")
    //超出范围重置下标
    var berindex = ++bannerindex > $(".banner ul").children().length-1 ? 0 : bannerindex;
    //获取下一张图片的title值,按照title匹配原始序列图片并添加到当前图片的后面
    imgindex.eq(berindex).insertAfter($(".banner ul").children().first())
    //给相同下标得小点点添加高亮,并移除其兄弟的高亮
    $("ol li").eq(berindex).addClass("active").siblings().removeClass("active")
    //根据上面排列到的执行下一页动画
    //下一页
    nextpage()
},3000)
$(".banner").hover(function(){
    clearInterval(inter);
},function(){
    // setInterval(inter);
    inter =  setInterval(function(){
        //获取当前图片的title
        var bannerindex = $(".banner ul").children().first().attr("title")
        //超出范围重置下标
        var berindex = ++bannerindex > $(".banner ul").children().length-1 ? 0 : bannerindex;
        //获取下一张图片的title值,按照title匹配原始序列图片并添加到当前图片的后面
        imgindex.eq(berindex).insertAfter($(".banner ul").children().first())
        //给相同下标得小点点添加高亮,并移除其兄弟的高亮
        $("ol li").eq(berindex).addClass("active").siblings().removeClass("active")
        //根据上面排列到的执行下一页动画
        //下一页
        nextpage()
    },3000)
})
// element.addEventListener(event, function, useCapture)