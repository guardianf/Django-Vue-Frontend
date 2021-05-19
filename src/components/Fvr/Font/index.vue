<template>
  <span :class="['fvr-font-'+ size, 'fvr-font-color-' + type]">
    <slot />
  </span>
</template>

<script>
/**
 * define font-size
 * @type { array }
 */
const FontSize = ['xl', 'l', 'm', 'b', 's', 'xs']

export default {
  name: 'FvrFont',
  props: {
    size: {
      type: String,
      default: 'b',
      validator(val) {
        return FontSize.indexOf(val.toLowerCase()) !== -1
      }
    },
    type: {
      type: String,
      default: 'default',
      validator(value) {
        return ['default', 'error', 'black'].indexOf(value.toLowerCase()) !== -1
      }
    }
  }
}
</script>
