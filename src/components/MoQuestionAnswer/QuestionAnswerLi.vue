<template>
  <div id="qa-li">
    {{heading}}
  </div>
</template>

<script>
export default {
  name: 'QuestionAnswerLi',
  props: ['heading']
}
</script>

<style scoped>
  #qa-li{
    border-bottom: RGB(238,238,245) solid 1px;
    text-align: left;
    line-height: 35px;
    /*height: 50px;*/
    font-size: 16px;
    margin: 10px 10px 0 10px;
    font-weight: bold;
    word-wrap: break-word;
    cursor: pointer;
  }
  #qa-li:hover{
    color: RGB(219,112,147);
  }
</style>
