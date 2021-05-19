<template>
  <fvr-input
    border="underline"
    :value="newValue"
    @input="submit"
  >
    <img slot="append" :src="src" @click="refresh">
  </fvr-input>
</template>

<script>
import FvrInput from '@/components/Fvr/Input'
import request from '@/utils/request'

export default {
  name: 'Captcha',
  components: {
    'fvr-input': FvrInput
  },
  props: {
    value: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      src: ''
    }
  },
  computed: {
    newValue() {
      return this.value
    }
  },
  created() {
    this.getCaptcha()
  },
  methods: {
    getCaptcha() {
      const url = '/api/v1/captcha/?t=' + Date.now()
      return request({
        url: url
      }).then(res => {
        this.src = url
      })
    },
    submit(value) {
      this.$emit('input', value)
    },
    refresh() {
      this.getCaptcha()
    }
  }
}
</script>

<style scoped>
* {
  color: red;
}
</style>
