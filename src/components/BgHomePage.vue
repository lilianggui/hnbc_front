<template>
    <div id="bg-home-page">
<!--      <div id="sidebar">-->
<!--      &lt;!&ndash;属性结构 todo&ndash;&gt;-->
<!--          <router-link :to="item.path" v-for="item in menus" :key="item.name" @click.native="selectMenu($event)">-->
<!--            <div class="sidebar-li">{{item.name}}</div>-->
<!--          </router-link>-->
<!--      </div>-->
      <sidebar :menu-active="menuActive"></sidebar>
      <div id="content">
        <el-tabs v-model="activeTab" type="card" @tab-remove="removeTab" @tab-click="clickTab" id="tab-card">
          <el-tab-pane
            v-for="item in editableTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
            :closable="item.closeable"
          >
          </el-tab-pane>
        </el-tabs>
        <router-view/>
      </div>
    </div>
</template>

<script>
import $ from 'jquery'
import Sidebar from '@/components/Sidebar'
export default {
  name: 'BgHomePage',
  data () {
    return {
      menuActive: '0',
      activeTab: '1',
      editableTabs: [{
        title: '首页',
        name: '0',
        path: '/bg/bgIndex',
        closeable: false
      }]
    }
  },
  watch: {
    $route (to, from) {
      this.openTabByRoute(to)
    },
    activeTab (newValue, oldValue) {
    }
  },
  created () {
    this.openTabByRoute(this.$route)
  },
  mounted () {
  },
  methods: {
    openTabByRoute (route) {
      console.log(route)
      let isOpen = false
      let activeTab = this.activeTab
      this.editableTabs.forEach(item => {
        if (item.path === route.path) {
          isOpen = true
          activeTab = item.name
          return false
        }
      })
      if (!isOpen) {
        let query = route.query
        let newTab = {
          path: route.path,
          query: query,
          title: query.menuTitle,
          name: query.menuId,
          closeable: true
        }
        this.editableTabs.push(newTab)
        activeTab = newTab.name
      }
      if (activeTab) {
        this.activeTab = activeTab
      }
    },
    clickTab (targetTab) {
      this.editableTabs.forEach(item => {
        if (item.name === targetTab.name) {
          this.$router.push({path: item.path, query: $.extend({}, {menuTitle: item.title, menuId: item.name}, item.query)}).catch(err => {
            console.log('路由跳转异常', err)
          })
          this.menuActive = item.name
          return false
        }
      })
    },
    removeTab (targetName) {
      let tabs = this.editableTabs
      let activeName = this.activeTab
      let targetTab = {}
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
              targetTab = nextTab
            }
          }
        })
      }
      this.activeTab = activeName
      this.clickTab(targetTab)
      this.editableTabs = tabs.filter(tab => tab.name !== targetName)
    }
  },
  components: {
    Sidebar
  }
}
</script>

<style scoped>
  #bg-home-page{
    display: flex;
    text-align: left;
  }
  #sidebar{
    width: 150px;
    min-height: 700px;
    background-color: #2c3e50;
    color: white;
    text-align: center;
  }
  #content{
    min-height: 700px;
    min-width: 1250px;
    background-color: #f5f6f7;
    padding: 0 0 0 10px;
  }
  .sidebar-li{
    width: 150px;
    height: 50px;
    line-height: 50px;
    border-bottom: #555555 solid 1px;
    cursor: pointer;
    color: white;
  }
  .sidebar-li:hover{
    background-color: #2c4e60;
  }
  a{
    text-decoration:none;
  }
  #tab-card{
    background-color: white;
  }
</style>
