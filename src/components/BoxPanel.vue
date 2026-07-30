<template>
  <div class="boxstyle panel-wrap">
    <div v-if="title" class="title">{{ title }}</div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'BoxPanel',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.panel-wrap {
  height: 100%;
  overflow: hidden;
}
</style>
