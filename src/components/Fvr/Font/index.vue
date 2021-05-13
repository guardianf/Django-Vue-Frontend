<template>
  <span
    :class="['fvr-font-'+ size, 'fvr-font-color-' + type]">
    <slot></slot>
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
        return FontSize.indexOf(val.toLowerCase()) !== -1;
      }
    }, 
    type: {
      default: 'default',
      validator(value) {
        return ['error', 'default'].indexOf(value.toLowerCase()) !== -1
      }
    }
  },
}
</script>