<template>

  <div>
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <menu-item v-for="item in menuList" :menu="item" :key="item.id"></menu-item>
    </el-menu>
  </div>
</template>

<script>
import MenuItem from '@/components/MenuItem.vue'
export default {
  name: 'Sidebar',
  props: ['menu-active'],
  data () {
    return {
      defaultActive: '10',
      menuList: [
        {id: '1', title: '问答管理', icon: 'el-icon-location', isBottom: '1', path: '/bg/bgQuestionsAnswers'},
        {
          id: '2',
          title: '书画艺术',
          icon: 'el-icon-location',
          isBottom: '',
          children: [
            {id: '21', title: '书法', icon: 'el-icon-location', isBottom: '1', path: '/bg/bgCalligraphy'},
            {id: '22', title: '绘画', icon: 'el-icon-location', isBottom: '1'},
            {id: '23', title: '雕塑', icon: 'el-icon-location', isBottom: '1'},
            {id: '24', title: '建筑', icon: 'el-icon-location', isBottom: '1'}
          ]
        },
        {
          id: '3',
          title: '威名远扬',
          icon: 'el-icon-location',
          isBottom: '',
          children: [
            {id: '31', title: '名企', icon: 'el-icon-location', isBottom: '1', path: '/bg/bgCalligraphy'},
            {id: '32', title: '名人', icon: 'el-icon-location', isBottom: '1'},
            {id: '33', title: '名车', icon: 'el-icon-location', isBottom: '1'},
            {id: '34', title: '建筑', icon: 'el-icon-location', isBottom: '1'}
          ]
        },
        {
          id: '6',
          title: '音影娱乐',
          icon: 'el-icon-location',
          isBottom: '',
          children: [
            {id: '61', title: '短视频', icon: 'el-icon-location', isBottom: '1', path: '/bg/bgShortVideo'},
            {id: '62', title: '音乐', icon: 'el-icon-location', isBottom: '1'}
          ]
        },
        {
          id: '4',
          title: '诗词歌赋',
          icon: 'el-icon-location',
          isBottom: '',
          children: [
            {
              id: '41',
              title: '唐诗',
              icon: 'el-icon-location',
              isBottom: '',
              children: [
                {id: '412', title: '李白', icon: 'el-icon-location', isBottom: '1', path: '/bg/bgQuestionsAnswers'},
                {id: '413', title: '杜甫', icon: 'el-icon-location', isBottom: '1', path: '/bg/bgCalligraphy'}
              ]
            },
            {id: '42', title: '宋词', icon: 'el-icon-location', isBottom: '1'},
            {id: '43', title: '元曲', icon: 'el-icon-location', isBottom: '1'}
          ]
        },
        {id: '5', title: '汉语词汇', icon: 'el-icon-location', isBottom: '1'},
        {id: '7', title: '名人名言', icon: 'el-icon-location', isBottom: '1'}
      ]
    }
  },
  watch: {
    menuActive (newValue, oldValue) {
      this.defaultActive = newValue
    }
  },
  methods: {
  },
  components: {
    MenuItem
  }
}
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 800px;
  }
</style>
