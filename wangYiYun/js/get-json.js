// 回调函数封装方法
function getJSON() {
  var url, data, callback;
  // console.log(arguments);
  url = arguments[0];
  if (typeof arguments[1] == "function") {
    callback = arguments[1];
  } else {
    data = arguments[1];
    callback = arguments[2];
  }

  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      // 成功
      // console.log()
      callback(JSON.parse(xhr.response));
    }
  };

  // test.json?name=nick&age=17

  if (data) {
    var queryStr = "";
    for (key in data) {
      //   console.log(key, data[key]);
      queryStr += key + "=" + data[key] + "&";
    }
    queryStr = queryStr.slice(0, -1);

    var url = url + "?" + queryStr;
  }
  // console.log(url);

  xhr.open("GET", url, true);
  xhr.send();
}

  // getJSON("./test.json", { name: "nick", age: 17 }, function (data) {
//   getJSON("https://v1.alapi.cn/api/music/search", { keywords: "海阔天空", limit: 10,type:1 }, function (data) {
//     console.log("data", data.data.songs);
//   });