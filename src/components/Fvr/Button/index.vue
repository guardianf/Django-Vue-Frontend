<template>
  <el-tooltip
    v-if="newContent"
    popper-class="fvr-tooltip"
    :content="newContent"
    :hide-after="1000"
  >
    <el-button
      :class="['fvr-button', newType ? 'fvr-button--' + newType : '']"
      :circle="isCircle"
      :icon="newIcon"
      :size="newSize"
      :type="newType"
      :disabled="disabled"
    >
      <slot />
    </el-button>
  </el-tooltip>
  <el-button
    v-else
    :class="['fvr-button', newType ? 'fvr-button--' + newType : '']"
    :circle="isCircle"
    :icon="newIcon"
    :size="newSize"
    :type="newType"
    :disabled="disabled"
  >
    <slot />
  </el-button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    circle: {
      type: Boolean,
      default: undefined
    },
    icon: {
      type: String,
      default: undefined
    },
    size: {
      type: String,
      default: undefined
    },
    type: {
      type: String,
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    },
    content: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isCircle: this.circle,
      newIcon: this.icon,
      newSize: this.size,
      newType: this.type,
      newContent: this.content
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';

.fvr-button {
  &.fvr-button--primary {
    &, &:focus {
      background-color: $blue;
      color: #ffffff;
    }
  }
  &.fvr-button--icon {
    &, &:focus {
    font-size: 25px;
    background-color: transparent;
    color: $light-blue;
    padding: 0;
    border-color: transparent;
    }
  }
  &.fvr-button--icon {
    &, &:focus {
      font-size: 25px;
      background-color: transparent;
      color: $light-blue;
      padding: 0;
      border-color: transparent;
    }
    &:hover {
      color: var(--color-text-hover);
      border-color: transparent;
      background-color: transparent;
    }
  }
  &.fvr-button--text {
    &, &:focus {
      color: $light-blue;
    }
    &:hover {
      color: var(--color-text-hover);
    }
  }
  .fvr-button:focus {
    min-width: 30px;
    background-color: #ffffff;
  }
  &.is-disabled {
    background-color: transparent;
    color: $fontDisabled;
    &:focus, &:hover {
      background-color: transparent;
    }
  }
}
</style>
