<template>
  <div class="manage-title">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ManageTitle'
}
</script>

<style scoped>
  .manage-title{
    font-weight: bold;
    font-size: 16px;
  }
</style>
