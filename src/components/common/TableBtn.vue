<template>
    <div class="table-btn">
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'TableBtn'
}
</script>

<style scoped>
  .table-btn{
    background-color: white;
    margin-bottom: 5px;
    padding: 0 0 10px 0;
  }
</style>
