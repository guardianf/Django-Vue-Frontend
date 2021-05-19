<template>
  <fvr-dialog
    ref="dialog"
    width="600px"
    :confirm-fn="saveItem"
    :cancel-fn="clearItem"
    :title="titleText"
  >
    <el-form ref="form" :model="item">
      <el-row type="flex" :gutter="20">
        <el-col :span="12">
          <fvr-font bold display="block" for="serialNumber">Serial Number</fvr-font>
          <fvr-input v-model="item.serial_number" :disabled="isEdit ? true: false" @blur="uniqueCheck" />
        </el-col>
        <el-col :span="12">
          <fvr-font bold display="block" for="type">Type</fvr-font>
          <fvr-select v-model="item.type_id" style="width: 100%" :options="arm_types_options" />
        </el-col>
      </el-row>
      <el-row type="flex" :gutter="20">
        <el-col :span="12">
          <fvr-font bold display="block" for="stateSelect">State</fvr-font>
          <fvr-select v-model="item.state" default style="width: 100%" :options="arm_state_options" />
        </el-col>
        <el-col :span="12">
          <fvr-font bold display="block" for="customer">Customer</fvr-font>
          <fvr-select v-model="item.customer_id" style="width: 100%" :options="customer_options" />
        </el-col>
      </el-row>
    </el-form>
  </fvr-dialog>
</template>

<script>
import request from '@/utils/request'
import fvrFont from '@/components/Fvr/Font'
import fvrSelect from '@/components/Fvr/Select'
import fvrInput from '@/components/Fvr/Input'
import fvrDialog from '@/components/Fvr/Dialog'

export default {
  name: 'Dialog',
  components: { fvrFont, fvrSelect, fvrInput, fvrDialog },
  data() {
    return {
      dialogVisible: false,
      isEdit: false,
      item: {},
      createDisable: false,
      createNew: false,
      arm_types_options: [],
      arm_state_options: [],
      customer_options: []
    }
  },
  computed: {
    titleText() {
      return `${this.isEdit ? `Edit` : `Add`} Arm`
    }
  },
  methods: {
    show() {
      this.$refs.dialog.show()
    },
    clearItem() {
      this.item = {}
      this.$refs.form.resetFields()
    },
    saveItem() {
      this.clearItem()
    },
    uniqueCheck(serial_number) {
      if (!serial_number) {
        return
      }
      request.get(`/api/v1/robot/armx/${serial_number}/status/`).then((data) => {
        if (data.code === 20200) {
          switch (data.data.ret) {
            case 1:// new
              this.createDisable = false
              this.createNew = true
              break
            case 2:// exist
              this.createDisable = true
              this.createNew = false
              break
            case 3:// deleted
              this.createDisable = false
              this.createNew = false
              this.item.id = data.data.id
              this.$refs.unique_check.show()
              break
          }
        }
      })
    }
  }
}
</script>
