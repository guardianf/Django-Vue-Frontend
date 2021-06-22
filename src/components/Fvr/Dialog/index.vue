<template>
  <el-dialog
    class="fvr-dialog"
    :visible="visible"
  >
    <fvr-font slot="title" bold size="m" type="black">{{ title }}</fvr-font>
    <div class="fvr-dialog--spliter" />
    <div class="fvr-dialog--container">
      <slot />
    </div>
    <div slot="footer">
      <fvr-button type="text" style="color: var(--color-default);" @click.native="close">Cancel</fvr-button>
      <fvr-button ref="saveBtn" type="text" style="font-weight: bold;" :disabled="saveStatus" @click.native="confirm">Save</fvr-button>
    </div>
  </el-dialog>
</template>

<script>
import fvrButton from '../Button'
import fvrFont from '../Font'

export default {
  name: 'PopDialog',
  components: { fvrButton, fvrFont },
  props: {
    title: {
      type: String,
      default: ''
    },
    confirmFn: {
      type: Function,
      default: () => {}
    },
    cancelFn: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      visible: false,
      saveStatus: false
    }
  },
  methods: {
    show() {
      this.visible = true
    },
    close() {
      this.visible = false
      this.cancelFn()
    },
    confirm() {
      this.close()
      this.confirmFn()
    }
  }
}
</script>

<style lang="scss">
.fvr-dialog {
  .fvr-dialog--spliter {
    background-color: #e2e2e2;
    height: 1px;
  }
  .fvr-dialog--container {
    padding: 20px 0;
  }
  .el-dialog__body {
    padding: 0 20px;
  }
  .el-dialog__footer {
    padding: 10px 20px;
  }
}
</style>
