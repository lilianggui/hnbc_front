const GLB_DEFINED = function (Vue) {
  Vue.prototype.DICT = function () {
    return {
      CALLIGRAPHY_TYPEFACE: [
        {label: '行书', value: '1'},
        {label: '楷书', value: '2'},
        {label: '草书', value: '3'},
        {label: '隶书', value: '4'},
        {label: '小篆', value: '5'},
        {label: '大篆', value: '6'}
      ],
      SHORT_VIDEO_TYPE: [
        {label: '搞笑', value: '1'},
        {label: '科技', value: '2'},
        {label: '历史', value: '3'},
        {label: '资讯', value: '4'},
        {label: '军事', value: '5'},
        {label: '旅游', value: '6'},
        {label: '教育', value: '7'},
        {label: '体育', value: '8'}
      ],
      SYSTEM_FILE_MODULE: [
        {label: '书法', value: '1'},
        {label: '书法模块批量上传图片zip文件', value: '12'},
        {label: '短视频', value: '2'},
        {label: '短视频封面', value: '21'}
      ],
      SYSTEM_FILE_MODULE_KV: {
        CALLIGRAPHY_IMG: '1',
        CALLIGRAPHY_BATCH_ZIP: '12',
        SHORT_VIDEO_FILE: '2',
        SHORT_VIDEO_COVER: '21'
      }
    }
  }
}

export default GLB_DEFINED
