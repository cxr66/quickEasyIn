// 时间
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 解析链接中的参数
let getQueryString = function (url, name) {
  console.log("url = " + url)
  console.log("name = " + name)
  var reg = new RegExp('(^|&|/?)' + name + '=([^&|/?]*)(&|/?|$)', 'i')
  var r = url.substr(1).match(reg)
  if (r != null) {
    console.log("r = " + r)
    console.log("r[2] = " + r[2])
    return r[2]
  }
  return null;
}
 

/* 计算两个日期之间的天数 */
let getDaysBetween  = function(dateString1,dateString2){
  var  startDate = Date.parse(dateString1);
  var  endDate = Date.parse(dateString2);
  var days=(endDate - startDate)/(1*24*60*60*1000);
  // alert(days);
  return  days;
}




// 跳转
const navigate =  function (e) {
  let link = e.currentTarget.dataset.link;
  wx.navigateTo({
    url: link
  })
}

module.exports = {
  formatTime: formatTime,
  getQueryString: getQueryString,
  getDaysBetween: getDaysBetween,
  navigate: navigate
}


