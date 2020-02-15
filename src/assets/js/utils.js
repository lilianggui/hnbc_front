import $ from 'jquery'

const IP_HOST = 'http://localhost:8088'

function commonUtil (Vue, options) {
  Vue.prototype.getIpHost = function () {
    return IP_HOST
  }
  Vue.prototype.callAjax = function (url, param, method, successCallBack, async) {
    let that = this
    $.ajax({
      url: IP_HOST + url,
      type: method,
      data: param,
      async: async === undefined ? true : async,
      success: function (result) {
        if (result.code + '' === '1') {
          that.$message({
            message: result.msg,
            type: 'error'
          })
          return
        }
        if (successCallBack) {
          successCallBack(result)
        }
      },
      error: function (res) {
        that.$message({
          message: 'error'
        })
      },
      complete: function () {
      }
    })
  }
  Vue.prototype.shallowCopy = function (src) {
    let dst = {}
    for (let prop in src) {
      if (src.hasOwnProperty(prop)) {
        dst[prop] = src[prop]
      }
    }
    return dst
  }
  Vue.prototype.getDictLabel = function (dict, value) {
    let ds = this.DICT()[dict]
    let result = ''
    ds.forEach(function (item) {
      if (item.value + '' === value + '') {
        result = item.label
        return false
      }
    })
    return result
  }
  Vue.prototype.imageSrc = function (url) {
    return IP_HOST + '/getPicture?filePath=' + url
  }
  Vue.prototype.videoSrc = function (url) {
    return IP_HOST + '/getFile?filePath=' + url
  }
}

export default commonUtil
