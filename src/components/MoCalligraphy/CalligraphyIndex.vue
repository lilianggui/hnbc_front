<template>
  <div id="calligraphy-div">
    <calligraphy-card v-for="item in calligraphyList" :key="item.id" :calligraphy="item"
                      @click.native="goToDetail(item)" ></calligraphy-card>
  </div>
</template>

<script>
import CalligraphyCard from '@/components/MoCalligraphy/CalligraphyCard'
export default {
  name: 'CalligraphyIndex',
  components: {
    CalligraphyCard
  },
  data () {
    return {
      calligraphyList: []
    }
  },
  created () {
    let that = this
    this.callAjax('/listCalligraphy', {}, 'GET', function (res) {
      that.calligraphyList = res.data.list
    })
  },
  methods: {
    goToDetail (calligraphy) {
      this.$router.push({path: '/calligraphyDetail', query: {id: calligraphy.id}})
    }
  }
}
</script>

<style scoped>
  #calligraphy-div{
    width: 1020px;
    min-height: 800px;
    background-color: #f6f7f8;
    display: inline-block;
    margin-bottom: 20px;
    padding: 10px 0 0 15px;
  }
</style>
