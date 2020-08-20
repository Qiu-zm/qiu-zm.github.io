var audios = document.querySelector(".audio");
var inp = document.querySelector(".make_middle input")
var newrange = document.querySelector(".newrange")
var timeleft = document.querySelector(".time_left");
var timeright = document.querySelector(".time_right");
var box = document.querySelector(".box_content");
var boxtop = document.querySelector(".box_top");
var pstate = document.querySelectorAll(".make_foot label");

var playlist = [{
    id: "1344644402",
    name: "The Tech Thieves",
    artists: "Fake",
    picUrl: "https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
}, {
    id: "1331819951",
    name: "王贰浪",
    artists: "像鱼",
    picUrl: "https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
}, {
    id: "1396973729",
    name: "丫蛋蛋",
    artists: "大田後生仔",
    picUrl: "https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
}, {
    id: "1383205688",
    name: "CHROMANCE",
    artists: "Wrap Me In Plastic",
    picUrl: "https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
}, {
    id: "441491828",
    name: "郭顶",
    artists: "水星记",
    picUrl: "https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
}, {
    id: "1368739917",
    name: "糯米Nomi",
    artists: "寂寞才说爱",
    picUrl: "https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
}, {
    id: "1368739917",
    name: "糯米Nomi",
    artists: "寂寞才说爱",
    picUrl: "",
    // picUrl: "https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
    // picUrl: "https://p2.music.126.net/Y3KuzbKJor8y4z6zXQNzUg==/1368739917.jpg",
}
]
//获取数据,动态创建列表
playlist.forEach(function (element, index) {

    // songimg(1368739917);
    // console.log('songimg(1368739917) :>> ', songimg(1368739917));
    var itembox = document.createElement("div");
    // console.log('element.picUrl :>> ', element.picUrl);
    // element.picUrl = element.picUrl[0].al.picUrl;
    itembox.classList.add("item");
    itembox.setAttribute("data-id", element.id);
    itembox.setAttribute("data-index", index);
    
    
    itembox.innerHTML = "<div class='left'><img class='songimg' src='" + element.picUrl + "'></div><div class='right'><h4>" + element.artists + "</h4><p>" + element.name + "</p></div>";


    box.appendChild(itembox);
});
// songimg(1368739917);
//废弃
function songimg(songId) {
    $.ajax({
        type: "GET",
        url: "https://api.imjad.cn/cloudmusic/",
        data: {
            type: "detail",
            id: songId
        },
        dataType: "JSON",
        success: function (response) {
            // return response;
            console.log('$(".songimg") :>> ', $(".item"),response);
            $(this).css("background-image","url(on.jpg)");
            // console.log('$(".songImg") :>>' , response);
            // console.log('response :>> ', response.songs[0].al.picUrl);
            // $(than)[0].picUrl = response.songs[0].al.picUrl
            // return response.songs[0].al.picUrl
        }
    });
    // getJSON(
    //     // http://api.kele8.cn/agent/
    //     "https://api.imjad.cn/cloudmusic/",{
    //         type:"detail",
    //         id:songId
    //     },
    //     function (data) {
    //         return data.songs[0].al.picUrl;
    //     })

}
//秒数为奇数时补零
function aaa(sum) {
    if (sum < 10) {
        return sum = "0" + sum;
    } else if (sum == 0) {
        return sum = 00;
    } else {
        return sum;
    }
}

//Ztime     总秒数
//WZtime    将排好的时间放入位置
function PJSJ(Ztime, WZtime) {
    //秒数为奇数时补零
    //排版时间格式
    var min = Math.floor(Ztime % 3600);
    //拼接时间
    WZtime.innerHTML = aaa(Math.floor(Ztime / 3600)) + ":" + aaa(Math.floor(min / 60)) + ":" + aaa(Math.floor(Ztime % 60));


}

//更换音频时触发
audios.addEventListener("durationchange", function () {
    //调整input最大值
    inp.max = audios.duration;

    // //排版时间格式
    var min = Math.floor(audios.duration % 3600);
    // //拼接时间
    timeright.innerHTML = aaa(Math.floor(audios.duration / 3600)) + ":" + aaa(Math.floor(min / 60)) + ":" + aaa(Math.floor(audios.duration % 60));

    //排版时间格式
    PJSJ(audios.duration, timeright)
    // timeright.innerHTML = 
})




//进度条位置改变时
audios.addEventListener("timeupdate", function () {

    //input也跟着变化
    inp.value = audios.currentTime;
    //改变新进度条长度
    newrange.style.width = audios.currentTime / audios.duration * 100 + "%";
    //显示剩余时间
    var sec = Math.floor(audios.currentTime);

    //排版时间
    PJSJ(sec, timeleft)

    //判断是否点击随机播放

})

pstate.forEach(function (item, index) {

    // item.lastElementChild.classList.add("hide");
    item.onclick = function () {
        // console.log(item.firstElementChild.checked);
        pstate.forEach(function (ite, ind) {
            ite.lastElementChild.classList.add("hide");
        })
        if (item.firstElementChild.checked) {
            item.lastElementChild.classList.remove("hide");
        }
    }

})


//当前歌曲播放完毕
audios.addEventListener("ended", function () {
    console.log("播放完毕");

    if (pstate[3].firstElementChild.checked) {
        //判断是否到达边界值
        cut();
        //切换歌曲
        songplay(items, constant);
        //判断是否暂停
        Isstop(lis[1]);

    } else {

        isPattern(true);
    }
});
pstate[0].firstElementChild.checked = true;
//判断当前处于什么模式
// flag true/下一曲
// flag flase/上一曲
function isPattern(flag = true) {

    console.log("播放模式" + flag);

    if (pstate[3].firstElementChild.checked) {
        console.log("单曲循环");
        // constant;
        if (flag) {
            songnum++;
            console.log("下一首");

        } else {
            songnum--;
            console.log("上一首");

        }
        //判断是否到达边界值
        cut();
        //切换歌曲
        songplay(songList, songnum);
        //判断是否暂停
        Isstop(lis[1]);

    } else if (pstate[1].firstElementChild.checked) {
        console.log("列表循环" + songnum);
        if (flag) {
            songnum++;
        } else {
            songnum--;
        }


        cut();
        songplay(songList, songnum);
        Isstop(lis[1]);

    } else if (pstate[2].firstElementChild.checked) {
        console.log("随机播放");



        suiji();

    } else {
        console.log("列表播放");
        if (flag) {
            songnum++;
        } else {
            songnum--;
        }
        if (songnum == songList.length) {
            audios.pause();
            console.log("最后一条 " + songnum)
            songnum = songnum;
        } else {
            // constant++;

            cut();

            songplay(songList, songnum);
            Isstop(lis[1]);
        }
    }
}


//拉动进度条时
inp.addEventListener("input", function () {

    //播放器也跟着变化
    audios.currentTime = inp.value;
    //改变新进度条长度
    newrange.style.width = audios.currentTime / audios.duration * 100 + "%";

})

//封装判断是否为暂停状态
function Isstop(obj) {
    if (audios.paused) {
        obj.classList.add("stop");
        audios.play();
    } else {
        audios.pause();
        obj.classList.remove("stop");

    }

}
//暂停/播放 按钮
var lis = document.querySelectorAll("ul li");
lis[1].onclick = function () {
    Isstop(this);

}

//封装播放歌曲
//obj   歌曲对象
//index 第几首歌 ,下标0开始
function songplay(songobj, inde) {

    istype(songobj, inde);
    // var dataid = songobj[inde].getAttribute("data-index");
    // console.log("songList ==>", songList)
    // console.log("songnum ==>", songnum)
    //获取自定义属性
    var dataid = songList[songnum].getAttribute("data-id");
    //添加选中高亮
    // console.log("获取歌手图片 ==>",songList[songnum])
    // console.log("获取歌手图片 ==>",songList[songnum].firstChild.firstChild.src)
    var songImg = songList[songnum].firstChild.firstChild.src;
    // this.classList.add("active");
    boxtop.style.backgroundImage = `url("${songImg}")`;
    //点击切换到当前歌曲的链接
    audios.src = "https://music.163.com/song/media/outer/url?id=" + dataid + ".mp3";
    //重置进度条
    newrange.style.width = 0;

    //获取当前歌手,歌名,并赋值到头部
    // var tname = document.querySelectorAll(".right h4");
    // var tp = document.querySelectorAll(".right p");


    // console.log("tname ==>",tname);
    // console.log("tp ==>",tp);

    topp.innerHTML = songList[songnum].lastChild.children[1].innerHTML;
    toph4.innerHTML = songList[songnum].lastChild.children[0].innerHTML;

    songList[songnum].classList.add("active");

}


//点击切换歌曲
var toph4 = document.querySelector(".make_top h4");
var topp = document.querySelector(".make_top p");
//歌曲选中高亮
var items = document.querySelectorAll(".item");
songplay(items, 0);
//初始化第一条歌曲高亮
items[0].classList.add("active");
//遍历歌单列表
items.forEach(function (elem, index) {
    //绑定歌曲点击事件
    elem.addEventListener("click", function () {

        // 判断当前页面
        istype(items, index);


        //排他操作
        // ritem.forEach(function (ele, ind) {
        //     ele.classList.remove("active");
        // })
        //排他操作
        songList.forEach(function (ele, ind) {
            ele.classList.remove("active");
        })

        // isPattern(true);
        //调用歌曲播放
        songplay(songList, songnum);
        //添加高亮
        this.classList.add("active");
        //更新当前位置
        songnum = index;
        //点击切换歌曲后,再次判断播放状态
        Isstop(lis[1]);

    })
})



//封装上下切换
function cut() {

    if (songnum < 0) {
        songnum = songList.length - 1;
    } else if (songnum > songList.length - 1) {
        songnum = 0;
    }

    songList.forEach(function (ele, ind) {
        ele.classList.remove("active");
    })
    songList[songnum].classList.add("active");
}


var constant = 0;

var searchnum = 0;

var songList;
var songnum = 0;

function istype(arr, indexs) {

    if (box.style.display == "block") {
        console.log("我的收藏");
        // istype = searchnum;
        songList = arr;
        songnum = indexs;
    } else {
        console.log("歌曲搜索");
        songList = arr;
        songnum = indexs;
    }
}

//上一曲

lis[0].onclick = function () {
    // constant--;
    // //调用上下切换
    // cut();
    // //播放歌曲
    // songplay(items, constant);
    // //点击切换歌曲后,再次判断播放状态
    // Isstop(lis[1]);

    isPattern(false);

}
//下一曲
lis[2].onclick = function () {
    // constant++;
    // cut();
    // songplay(items, constant);
    // Isstop(lis[1]);
    isPattern(true);


}


//随机播放
function suiji() {
    //遍历表单
    songList.forEach(function (ele, ind) {
        //随机数
        var randomsum = Math.floor(Math.random() * (songList.length));
        //查找当前播放的歌曲
        if (ele.classList.contains("active")) {
            //获取当前歌曲自定义属性
            var eleindex = ele.getAttribute("data-index")

            //当随机数与下标相等时,重新生成随机数
            while (eleindex == randomsum) {
                randomsum = Math.floor(Math.random() * (songList.length));
            }
            songnum = randomsum;
            //执行音乐播放
            songplay(songList, songnum);
            //给当前播放添加高亮
            songList[songnum].classList.add("active");
        }
        //排除其他高亮
        ele.classList.remove("active");
    })
}

//获取音量显隐大盒子
var volumeV = document.querySelector(".box-v");
//获取input音量滑块
var volumeinp = document.querySelector(".volume-v input");
//获取样式音量滑块
var volumediv = document.querySelector(".volume_make");

//加载时初始化音量
volumeinp.value = audios.volume * 100;
volumediv.style.width = audios.volume * 100 + "%";
//音量触发事件
audios.addEventListener("volumechange", function () {
    //赋值给input滑块
    volumeinp.value = audios.volume * 100;
    volumediv.style.width = audios.volume * 100 + "%";

})
//input音量事件
volumeinp.addEventListener("input", function () {
    console.log(volumeinp.value);
    audios.volume = volumeinp.value / 100;
    console.log('volumeinp.value :>> ', volumeinp.value);
    volumediv.style.width = volumeinp.value + "%";
    console.log('volumediv.style.width :>> ', volumediv.style.width);
})



//音量
var volume = document.querySelector(".foot_volume span");
var volumeStatus = true;
volume.onclick = function () {
    // volumeStatus = true;
    if (volumeStatus) {
        console.log("打开了音量");
        this.style.backgroundImage = "url('images/yinliang-v.png')";
        volumeV.style.display = "block";
        volumeStatus = false;

    } else {
        console.log("关闭了音量");
        this.style.backgroundImage = "url('images/yinliang.png')";
        volumeV.style.display = "none";

        volumeStatus = true;
    }


}

//收藏与搜索切换
var navs = document.querySelectorAll(".nav-lis");
var boxcv = document.querySelector(".box_content-v");


navs[0].onclick = function () {
    boxcv.style.display = "none";
    box.style.display = "block";
    this.classList.add("actv");
    navs[1].classList.remove("actv");
    // istype();
}
navs[1].onclick = function () {
    boxcv.style.display = "block";
    box.style.display = "none";
    this.classList.add("actv");
    navs[0].classList.remove("actv");
    // istype();
}

// 搜索歌曲
var boxr = document.querySelector(".box_content_right");
var textinp = document.querySelector(".box_content-v .search input");
var textspan = document.querySelector(".box_content-v .search span");
var isresou = true;

// hotMusic();

// $('.hotMusic').click(function(){
//     boxr.innerHTML = "";
//     hotMusic();
// })
// function hotMusic(){
    //热歌推荐
var resouarr = [];
var indexa = 0;
for (var i = 0; i < 20; i++) {
    getJSON(
        "https://api.uomg.com/api/rand.music?sort=%E7%83%AD%E6%AD%8C%E6%A6%9C&format=json",
        function (data) {
            // console.log("indexa++ ==>",indexa)

            var fragment = document.createDocumentFragment();

            //创建每一首盒子
            var itembox = document.createElement("div");

            //获取歌曲链接
            var str = data.data.url;
            //获取"="下标
            var pos = str.indexOf('=');
            // 在截取=后面的ID
            var result = str.substring(pos + 1, str.length);

            itembox.classList.add("item");
            itembox.setAttribute("data-id", result);
            itembox.setAttribute("data-index", indexa++);
            itembox.innerHTML = "<div class='left'><img src='" + data.data.picurl + "'></div><div class='right'><h4>" + data.data.name + "</h4><p>" + data.data.artistsname + "</p></div>";

            resouarr.push(itembox);

            fragment.appendChild(itembox);

            boxr.appendChild(fragment);
        })
}
// }

// console.log("热歌集合 ==>", resouarr)

textinp.value = "";
// 点击搜索
textspan.addEventListener("click", function () {

    isresou = false;
    var value = textinp.value;
    // console.log(value);
    getJSON(
        "https://v1.alapi.cn/api/music/search",
        {
            keyword: value,
            limit: 20,
            type: 1,
            type: 1006
        },
        function (data) {
            console.log(data);
            var songs = data.data.songs;
            // var str = "";
            boxr.innerHTML = "";
            //创建文档片段：主要解决操作真实DOM次数
            var fragment = document.createDocumentFragment();

            songs.forEach(function (element, index) {
                // str += "<li>歌曲ID:" + element.id + "</li>";
                // str += "<li>歌名:" + element.name + "</li>";
                // str += "<li>歌手:" + element.artists[0].name + "</li>";
                // str += "<li>歌手图片:" + element.artists[0].img1v1Url + "</li>";
                // str += "<li>歌曲歌词:" + element.lyrics.txt + "</li>";

                // $("ul.test").html(str);


                var itembox = document.createElement("div");
                // var itemp = document.createElement("p");

                itembox.classList.add("item");
                itembox.setAttribute("data-id", element.id);
                itembox.setAttribute("data-index", index);
                itembox.innerHTML = "<div class='left'><img src='" + element.artists[0].img1v1Url + "'></div><div class='right'><h4>" + element.name + "</h4><p>" + element.artists[0].name + "</p></div>";
                // itemp.innerText = element.lyrics.txt
                // itembox.appendChild(itemp);
                fragment.appendChild(itembox);

            });
            boxr.appendChild(fragment);

        });

    textinp.value = "";


})


// 搜索到时触发函数
$(boxr).bind("DOMNodeInserted", function () {
    var ritem = this.childNodes;

    ritem.forEach(function (elem, index) {
        // console.log(elem)
        //绑定歌曲点击事件
        elem.addEventListener("click", function () {
            //判断当前页面
            console.log("热歌点击下标 0==>", songnum)
            console.log("热歌index下标 0==>", index)

            if (isresou) {

                istype(resouarr, index);
                console.log("热歌下标 1==>", songnum)
                items.forEach(function (ele, ind) {
                    ele.classList.remove("active");
                })
                //排他操作
                songList.forEach(function (ele, ind) {
                    ele.classList.remove("active");
                })
                songnum--;
                
                //调用歌曲播放
                songplay(songList, songnum);
                //添加高亮
                this.classList.add("active");
                //点击切换歌曲后,再次判断播放状态
                Isstop(lis[1]);
                console.log("热歌下标 2==>", songnum)

            } else {
                istype(ritem, index);
                items.forEach(function (ele, ind) {
                    ele.classList.remove("active");
                })
                //排他操作
                songList.forEach(function (ele, ind) {
                    ele.classList.remove("active");
                })


                // isPattern(true);
                //调用歌曲播放
                songplay(songList, songnum);
                //添加高亮
                this.classList.add("active");
                //更新当前位置
                // songnum = index;
                //点击切换歌曲后,再次判断播放状态
                Isstop(lis[1]);
            }


        })
    })


});

