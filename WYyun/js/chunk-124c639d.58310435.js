(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-124c639d"],{"59f9":function(t,s,i){},6312:function(t,s,i){"use strict";i.r(s);var a=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"songlistetails"},[i("div",[i("van-nav-bar",{attrs:{"left-text":"返回",fixed:"","left-arrow":""},on:{"click-left":t.goback}})],1),i("div",{staticClass:"songlist-top",style:{"background-image":"url("+t.bgimg+")"}}),i("div",{staticClass:"song-list-box"},[i("div",{staticClass:"song-list-top"},[i("div",{staticClass:"song-list-left"},[t._m(0),i("div",{staticClass:"song-list-playall"},[t._v(" 播放全部"),i("span",[t._v("(共"+t._s(t.songListsData.length)+"首)")])])]),i("div",{staticClass:"song-list-collect"},[t._v("收藏")])]),t._l(t.songListsData,(function(s,a){return i("div",{key:a,staticClass:"song-list-top",on:{click:function(i){return t.goPlayPage(s)}}},[i("div",{staticClass:"song-list-left"},[i("div",{staticClass:"song-list-img-box"},[i("img",{staticClass:"auto-img",attrs:{src:s.al.picUrl}})]),i("div",{staticClass:"song-list-playall"},[i("div",{staticClass:"song-list-content"},[t._v(t._s(s.name))]),i("div",{staticClass:"song-list-detail"},[t._v(" "+t._s(s.ar[0].name)+" - "+t._s(s.al.name)+" ")])])]),i("div",{staticClass:"playbtn",on:{click:function(i){return i.stopPropagation(),t.playmusic(s)}}},[i("van-icon",{attrs:{name:"play-circle-o"}})],1)])}))],2)])},n=[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"song-list-img-box playimg"},[a("img",{staticClass:"auto-img",attrs:{src:i("0801")}})])}],o=(i("d81d"),i("59f9"),i("7c91")),l={data:function(){return{songListData:[],songListDetailsData:[],songListsData:[],bgimg:"",songlistid:""}},created:function(){this.getmusicData()},computed:{},watch:{},methods:{goback:function(){this.$router.go(-1)},getmusicData:function(){var t=this;this.$toast.loading({message:"加载中...",forbidClick:!0,duration:0,loadingType:"spinner"}),this.axios({method:"GET",url:"/recommend/songs",params:{cookie:o["a"].getCookies()}}).then((function(s){t.$toast.clear(),200===s.data.code&&(t.songListsData=s.data.data.dailySongs,t.bgimg=s.data.data.dailySongs[0].al.picUrl,t.songListData=s.data.data.dailySongs.map((function(t){return t.id})))})).catch((function(s){t.$toast.clear(),console.error(s)}))},goPlayPage:function(t){this.playmusicids=this.songListsData.map((function(t){return t.id})),this.$store.commit("setplaymusicids",this.playmusicids),this.$store.commit("setmusicid",t.id)},playmusic:function(t){this.playmusicids=this.songListsData.map((function(t){return t.id})),this.$store.commit("setplaymusicids",this.playmusicids),this.$store.commit("setmusicid",t.id)}}},c=l,e=i("2877"),r=Object(e["a"])(c,a,n,!1,null,null,null);s["default"]=r.exports}}]);
//# sourceMappingURL=chunk-124c639d.58310435.js.map