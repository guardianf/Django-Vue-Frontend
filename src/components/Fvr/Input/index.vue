<template>
  <el-input
    class="fvr-input-inside fvr-font-color-default"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template
      #prefix
      v-bind="$scopedSlots.prefix"
    >
      <slot name="prefix" />
    </template>
    <template
      #default
      v-bind="$scopedSlots.default"
    >
      <slot name="default" />
    </template>
    <template
      #suffix
      v-bind="$scopedSlots.suffix"
    >
      <slot name="suffix" />
    </template>
  </el-input>
</template>

<script>
export default {
  name: 'Input',
  data() {
    return {
      isFocus: false
    }
  },
  computed: {
    outerClass() {
      const classes = [
        `fvr-input`,
        `fvr-font-l`
      ].filter(item => item)
      return classes
    },
    newValue() {
      return this.value
    }
  },
  methods: {
    focus() {
      this.isFocus = true
    },
    blur() {
      this.isFocus = false
      this.$emit('blur', this.newValue, this.name)
    },
    submit(value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="scss">
</style>
