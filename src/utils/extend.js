Date.prototype.format = function (fmt) {
  if (!this) return
  var o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    'S': this.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }
  return fmt
}

String.prototype.formatDate = function (fmt) {
  let params = this.replace(/[-\s]/g, ':').split(':')
  params[1] -= 1
  let result = new Date(...params)
  return result.format(fmt)
}

String.prototype.padStart = function (num, str) {
  var s = this
  if (this.length >= num) {
    return s.substring(0, num)
  } else {
    var n = num - this.length
    for (var i = 0; i < n; i++) {
      s = str + s
    }
    return s
  }
}
