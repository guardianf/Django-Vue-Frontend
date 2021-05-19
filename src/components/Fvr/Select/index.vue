<template>
  <el-select
    popper-class="fvr-select--dropdown"
    collapse-tags
    no-data-text="empty content"
    :clearable="clearable"
    :value="newValue"
    :placeholder="newPlaceholder"
    :multiple="newMultiple"
    :class="['fvr-select', underline ? 'fvr-select--underline' : '']"
    :filterable="filterable"
    @input="submit"
    @change="submit"
  >
    <el-option
      v-for="item in newOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script>
export default {
    name: 'Select',
    props: {
        value: {
            type: [String, Number, Array],
            default: undefined
        },
        placeholder: {
            type: String,
            default: 'Please Choose'
        },
        options: {
            type: Array,
            default: () => []
        },
        multiple: {
            type: Boolean,
            default: false
        },
        underline: {
            type: Boolean,
            default: false
        },
        filterable: {
            type: Boolean,
            default: false
        },
        default: {
            type: Boolean,
            default: false
        },
        clearable: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            newPlaceholder: this.placeholder,
            newMultiple: this.multiple
        };
    },
    computed: {
        newOptions() {
            let options = this.options;
            return options;
        },
        newValue() {
            let ret;
            if (this.newMultiple) {
                ret = this.value;
            } else {
                ret =
          this.options.map(item => item.value).indexOf(this.value) !== -1
              ? this.value
              : this.default
                  ? this.options[0] && this.options[0].value
                  : '';
                if (this.default) {
                    this.$emit('input', ret);
                }
            }
            return ret;
        }
    },
    methods: {
        submit(val) {
            this.$emit('input', val);
        }
    }
};
</script>
