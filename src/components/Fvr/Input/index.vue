<template>
  <div
    :class="outerClass"
    :style="{ width: width }">
      <el-row type="flex" align="middle">
        <i v-if="prepend" :class="[prepend, 'fvr-icon']"></i>
        <slot name="prepend"></slot>
        <el-input
          class="fvr-input fvr-input-inside fvr-font-color-default"
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
          @blur="blur"></el-input>
        <slot name="append"></slot>
      </el-row>
    </div>
</template>

<script>
export default {
  name: 'Input',
  props: {
    value: { },
    placeholder: {
      type: String,
    },
    name: {
      type: String,
    },
    required: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: "",
    },
    width: {
      type: [String, Number],
    },
    type: {
      type: String,
      default: "text",
    },
    prepend: {
      type: String,
    },
    append: {
      type: String,
    },
    border: {
      type: String,
      default: "all",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    rows: {
      type: Number,
      default: 2,
    },
    resize: {
      type: String,
      dafault: "none",
      validator(value) {
        return ["none", "both", "horizontal", "vertical", ].includes(value) !== -1;
      },
    },
  },
  data() {
    return {
      isFocus: false,
    }
  },
  computed: {
    outerClass() {
      const classes = [
        `fvr-input-outside`,
        this.fontType ? `fvr-input-${this.fontType}` : ``,
        this.isFocus ? `fvr-input-focus`: ``,
        this.border ? `fvr-input-${ this.border }`: ``,
        `fvr-font-l`,
      ].filter(item => item);
      return classes;
    },
    newValue() {
      return this.value;
    },
  },
  methods: {
    focus() {
      this.isFocus = true;
    },
    blur() {
      this.isFocus = false;
      this.$emit("blur", this.newValue, this.name);
    },
    submit(value) {
      this.$emit("input", value);
    },
  },
}
</script>

<style scoped>

</style>