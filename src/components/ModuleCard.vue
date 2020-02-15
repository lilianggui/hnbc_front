<template>
    <div id="module-card" :style="moduleCardStyle()">
      {{title}}
    </div>
</template>

<script>
export default {
  name: 'ModuleCard',
  props: ['title', 'bg-color'],
  methods: {
    moduleCardStyle () {
      let bgColor = this.bgColor
      if (!this.bgColor) {
        bgColor = 'antiquewhite'
      }
      return {
        backgroundColor: bgColor
      }
    }
  }
}
</script>

<style scoped>
  #module-card{
    width: 140px;
    height: 100px;
    margin: 10px;
    line-height: 100px;
    font-size: 18px;
    cursor: pointer;
    display: inline-block;
  }
</style>
