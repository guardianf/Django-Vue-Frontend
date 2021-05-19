<template>
  <div>
    <div class="btn-bar">
      <fvr-select v-model="customer" placeholder="Customer" multiple :options="customer_options" />
      <fvr-select v-model="arm_state" placeholder="State" multiple :options="arm_state_options" />
      <fvr-button type="icon" class="el-icon-plus" content="add" @click.native="addItem" />
      <fvr-button type="icon" class="el-icon-download" content="download" @click.native="downloadItems" />
      <span style="flex: 1;" />
      <fvr-input v-model="search" placeholder="serial number" clearable append="el-icon-search" @keyup.enter.native="getItemList(1)">
        <i slot="prepend" class="el-icon-search" style="padding: 10px;cursor: pointer;" @click="getItemList(1)" />
      </fvr-input>
    </div>
    <el-table :data="tableData">
      <el-table-column label="No." type="index" :index="getIndex" />
      <el-table-column prop="serial_number" label="Serial Number" />
      <el-table-column prop="type_name" label="Type" />
      <el-table-column prop="state_name" label="State" />
      <el-table-column prop="customer" label="Customer" />
      <el-table-column label="Action" width="100px">
        <template slot-scope="scope">
          <div style="display: flex;justify-content: space-around;">
            <fvr-button type="icon" class="el-icon-edit-outline" @click.native="handleEdit(scope.$index, scope.row)" />
            <fvr-button type="icon" class="el-icon-delete" @click.native="handleDelete(scope.$index, scope.row)" />
          </div>
        </template>
      </el-table-column>
    </el-table>

    <arm-dialog ref="editDialog" />
    <!-- <el-confirm-dialog message="Are you sure to delete this arm?" @confirm="deleteItem" ref="delete_check" />
    <el-confirm-dialog message="The same serial number exist. Do you want to restore the data?" @confirm="restoreItem" @cancel="resetItem" ref="unique_check" /> -->
  </div>
</template>

<script>
import request from '@/utils/request'
import { getCustomer, getDeviceState, getArms } from '@/api/robot'
import fvrSelect from '@/components/Fvr/Select'
import fvrInput from '@/components/Fvr/Input'
import fvrButton from '@/components/Fvr/Button'
import armDialog from './components/dialog'

export default {
  components: { fvrSelect, fvrInput, fvrButton, armDialog },
  data() {
    return {
      customer: [], // filter: customer
      arm_state: [], // filter: arm state
      customer_options: [], // customer state
      arm_state_options: [], // arm state
      arm_types_options: [], // arm type
      search: '', // query string
      curPage: 0,
      pageSize: 10,
      item: { // arm data
        type_id: null,
        customer_id: null,
        state: null
      },
      tableData: []
    }
  },
  watch: {
    'arm_state': {
      handler(newVal) {
        this.getItemList(1)
      },
      deep: true
    },
    'customer': {
      handler(newVal) {
        this.getItemList(1)
      },
      deep: true
    }
  },
  created() {
    this.getCustomer()
    this.getArmState()
    // this.getArmTypes()
    this.getItemList()
  },
  methods: {
    resetItem() {},
    async getCustomer() {
      const res = await getCustomer()
      const { data } = res
      this.customer_options = data.map(item => {
        const { name, id } = item
        return {
          label: name,
          value: id
        }
      })
    },
    async getArmState() { // get arm state
      const res = await getDeviceState()
      const { data } = res
      this.arm_state_options = data.map(item => {
        const [label, value] = item
        return {
          value, label
        }
      })
    },
    getItemList(page = this.curPage, page_size = this.pageSize) { // get table list
      const urlParams = [
        `page=${page}`,
        `page_size=${page_size}`
      ].filter(item => item)
      for (let index = 0; index < this.arm_state.length; index++) {
        const element = this.arm_state[index]
        urlParams.push(`state=${element}`)
      }
      for (let index = 0; index < this.customer.length; index++) {
        const element = this.customer[index]
        urlParams.push(`customer_id=${element}`)
      }
      if (this.search) {
        urlParams.push(`search=${this.search}`)
      }
      getArms(urlParams).then(res => {
        const { code, data } = res
        if (code === 200) {
          const { results = [], count = 0, page_size = this.pageSize } = data
          this.tableData = results.map(row => {
            const ret = this.customer_options.filter(opt => opt.value === row.customer_id)
            row.customer = ret.length > 0 ? ret[0].label : ''
            return row
          })
          this.curPage = page
          this.total = count
          this.pageSize = page_size
        }
      })
    },
    getArmTypes() {
      const url = `/api/v1/robot/armtypes/`
      request.get(url).then((data) => {
        if (data.code === 20200) {
          const { results = [] } = data.data
          this.arm_types_options = results.map(item => {
            const { name, id } = item
            return {
              value: id, label: name
            }
          })
        }
      })
    },
    addItem() {
      this.$refs.editDialog.show()
    },
    saveItem() {
      // serial number is required
      if (!this.item.serial_number) {
        this.$message({
          type: 'error',
          message: 'Serial Number is required'
        })
        return
      }

      let url = ''
      const { id } = this.item
      let method = ''
      if (id) { // is not new
        url = `/api/v1/robot/${this.isEdit ? `arm` : `armx`}/${id}/`
        method = 'Put'
        this.item.is_deleted = false
      } else { // create new item
        url = `/api/v1/robot/${this.isEdit ? `arm/${id}` : 'arms/'}`
        method = this.isEdit ? 'PUT' : 'POST'
      }
      request({
        method,
        url,
        data: this.item,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then(res => {
        this.saveItemCallback()
      })
    },
    downloadItems() {
      request({
        url: '/api/v1/robot/arms/',
        type: 'get'
      }).then((data) => {
        if (data.code === 20200) {
          const { results = [] } = data.data
          const items = results
          let csv = [
            ['No.', 'Serial Number', 'Type', 'State', 'Customer']
          ]
          for (let i = 0; i < items.length; i++) {
            let row = [i + 1, items[i].serial_number, items[i].type_name, items[i].state_name, items[i].customer_id]
            row = row.join(',')
            csv.push(row)
          }
          csv = csv.join('\n')
          // let sheet = csv2sheet(csv)
          // let blob = sheet2blob(sheet)
          // blob2xlsx(blob, 'download_arms.xlsx')
        }
      })
    },
    deleteItem() {
      const { id } = this.item
      const url = `/api/v1/robot/arm/${id}/`
      request.delete(url).then((data) => {
        this.deleteItemCallback()
      })
    },
    restoreItem() {
      const { id } = this.item
      request.get(`/api/v1/robot/armx/${id}/`).then((data) => {
        const code = data.code
        if (code === 20200) {
          this.item = data.data
        }
      })
    },
    getIndex(row) {
      return row + 1
    }
  }
}
</script>

<style lang='scss' scoped>
@import '@/styles/variables.scss';

.btn-bar {
  display: flex;
  flex-flow: row;
  margin-bottom: 20px;
  & > *:not(:first-child) {
    margin-left: 5px;
  }
  & > *:not(:last-child) {
    margin-right: 5px;
  }
}
</style>
