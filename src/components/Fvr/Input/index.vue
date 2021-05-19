<template>
  <div
    :class="outerClass"
    :style="{ width: width }"
  >
    <el-row type="flex" align="middle">
      <i v-if="prepend" :class="[prepend, 'fvr-icon']" />
      <slot name="prepend" class="prepend" />
      <el-input
        class="fvr-input-inside fvr-font-color-default"
        :value="newValue"
        :clearable="clearable"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        :name="name"
        :type="type"
        :resize="resize"
        @input="submit"
        @focus="focus"
        @blur="blur"
      />
      <slot
        name="append"
        class="append"
      />
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: {
    value: {
      type: [String, Number],
      default: undefined
    },
    placeholder: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    },
    width: {
      type: [String, Number],
      default: undefined
    },
    type: {
      type: String,
      default: 'text'
    },
    prepend: {
      type: String,
      default: undefined
    },
    append: {
      type: String,
      default: ''
    },
    border: {
      type: String,
      default: 'all'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    rows: {
      type: Number,
      default: 2
    },
    resize: {
      type: String,
      default: 'none',
      validator(value) {
        return ['none', 'both', 'horizontal', 'vertical'].includes(value) !== -1
      }
    }
  },
  data() {
    return {
      isFocus: false
    }
  },
  computed: {
    outerClass() {
      const classes = [
        `fvr-input`,
        this.fontType ? `fvr-input-${this.fontType}` : ``,
        this.isFocus ? `fvr-input-focus` : ``,
        this.border ? `fvr-input-${this.border}` : ``,
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
.fvr-input {
  border: none;
  display: flex;
  flex-flow: row;
  .el-row {
    width: 100%;
  }
  * + .fvr-input-inside {
    padding-left: 0;
    & > input.el-input__inner {
      padding-left: 0;
    }
  }
  &.fvr-input--error {
    border: #f56c6c;
  }
  .el-input__inner {
    border: none !important;
    height: 100%;
  }
}
.fvr-input-underline {
  border-bottom: 1px solid #DCDFE6;
}
.fvr-input-all {
  border: 1px solid #DCDFE6;
  border-radius: 4px;
}
.fvr-input-focus {
  border-color: #7bafd4;
}
.fvr-input-inside {
  outline: none;
  flex: 1;
  height: 38px;
  background: transparent;
  font-size: 14px;
}
.fvr-input-inside.el-textarea {
  height: auto;
}
.fvr-input textarea {
	border: none;
}
.fvr-fullfill {
  flex: 1;
}
</style>
