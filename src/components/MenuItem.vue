<template>
  <div>
    <el-menu-item v-if="menu.isBottom" :index="menu.id" @click="openTab(menu)">
      <i :class="menu.icon"></i>
      <span slot="title">{{menu.title}}</span>
    </el-menu-item>
    <el-submenu v-else :index="menu.id">
      <template slot="title">
        <i v-if="menu.icon" :class="menu.icon"></i>
        <span slot="title">{{menu.title}}</span>
      </template>
      <menu-item v-for="item in menu.children" :menu="item" :key="item.id"></menu-item>
    </el-submenu>
  </div>
</template>

<script>
import MenuItem from '@/components/MenuItem.vue'
export default {
  name: 'MenuItem',
  props: ['menu'],
  components: {
    MenuItem
  },
  methods: {
    openTab (menu) {
      this.$router.push({path: menu.path, query: {menuTitle: menu.title, menuId: menu.id}}).catch(err => {
        console.log('路由跳转异常', err)
      })
    }
  }
}
</script>

<style scoped>

</style>
