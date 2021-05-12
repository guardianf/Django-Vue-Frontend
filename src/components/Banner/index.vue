<template>
  <el-header class="fvr-banner">
    <el-row type="flex" style="width: 100%" align="middle">
      <i class="fvr-logo" />
      <fvr-font size="xl" class="fvr-fullfill">Management System</fvr-font>
      <slot />
    </el-row>
  </el-header>
</template>

<script>
import FvrFont from '@/components/Font'

export default {
  name: 'FvrBanner',
  components: { FvrFont }
}
</script>

<style scoped>

</style>
