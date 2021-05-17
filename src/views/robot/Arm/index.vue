<template>
  <div>
    <div class="btn-bar">
      <el-select placeholder="Customer" v-model="customer" :options="customer_options" multiple />
      <el-select placeholder="State" v-model="arm_state" :options="arm_state_options" multiple />
      <el-button type="icon" @click.native="addItem" class="el-icon-plus" content="add" />
      <el-button type="icon" @click.native="downloadItems" class="el-icon-download" content="download" />
      <el-button type="icon" @click.native="getItemList()" class="el-icon-refresh" content="refresh" />
      <span style="flex: 1;"></span>
      <el-input placeholder="serial number"  v-model="search" clearable append="el-icon-search" @keyup.enter.native="getItemList(1)">
        <i class="el-icon-search" @click="getItemList(1)" slot="prepend" style="padding: 10px;cursor: pointer;"></i>
      </el-input>
    </div>
    <el-table :data="tableData">
      <el-table-column label="No." type="index" :index="getIndex"></el-table-column>
      <el-table-column prop="serial_number" label="Serial Number"></el-table-column>
      <el-table-column prop="type_name" label="Type"></el-table-column>
      <el-table-column prop="state_name" label="State"></el-table-column>
      <el-table-column prop="customer" label="Customer"></el-table-column>
      <el-table-column  label="Action" width="100px">
        <template slot-scope="scope">
          <div style="display: flex;justify-content: space-around;">
            <el-button type="icon" @click.native="handleEdit(scope.$index, scope.row)" class="el-icon-edit-outline" />
            <el-button type="icon" @click.native="handleDelete(scope.$index, scope.row)" class="el-icon-delete" />
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="itemDialogVisible" width="600px">
      <template slot="title">
        <el-font bold size="m" type="black">[[ isEdit ? "Edit": "Add" ]] Arm</el-font>
      </template>
      <el-form :model="item" class="fvr-dialog--container">
        <el-row type="flex" style="margin-bottom: 5px;">
          <el-col :span="24">
            <div style="background-color: var(--color-lightgrey);height: 1px;"></div>
          </el-col>
        </el-row>
        <el-row type="flex" :gutter="20">
          <el-col :span="12">
            <el-font bold display="block" for="serialNumber">Serial Number</el-font>
            <el-input v-model="item.serial_number" @blur="uniqueCheck" :disabled="isEdit ? true: false"></el-input>
          </el-col>
          <el-col :span="12">
            <el-font bold display="block" for="type">Type</el-font>
            <el-select :options="arm_types_options" v-model="item.type_id" style="width: 100%" />
          </el-col>
        </el-row>
        <el-row type="flex" :gutter="20">
          <el-col :span="12">
            <el-font bold display="block" for="stateSelect">State</el-font>
            <el-select :options="arm_state_options" v-model="item.state" default style="width: 100%" />
          </el-col>
          <el-col :span="12">
            <el-font bold display="block" for="customer">Customer</el-font>
            <el-select :options="customer_options" v-model="item.customer_id" style="width: 100%" />
          </el-col>
        </el-row>
      </el-form>
      <template slot="footer">
        <el-button type="text" @click.native="itemDialogVisible = false;" style="color: var(--color-default);">Cancel</el-button>
        <el-button type="text" @click.native="saveItem" :disabled="createDisable" style="font-weight: bold;">Save</el-button>
      </template>
    </el-dialog>
    
    <el-confirm-dialog message="Are you sure to delete this arm?" @confirm="deleteItem" ref="delete_check" />
    <el-confirm-dialog message="The same serial number exist. Do you want to restore the data?" @confirm="restoreItem" @cancel="resetItem" ref="unique_check" />
  </div>
</template>

<script>
import { request } from '@/utils/request';
import { getCustomer, getDeviceState, getArms } from '@/api/robot';

export default {
  data() {
    return {
      customer: [], // filter: customer
      arm_state: [], // filter: arm state
      customer_options: [], // customer state
      arm_state_options: [], // arm state
      arm_types_options: [], // arm type
      search: "", // query string
      item: { // arm data
        type_id: null,
        customer_id: null,
        state: null,
      },
    }
  },
  created() {
    this.getCustomer()
    this.getArmState()
    // this.getArmTypes()
    this.getItemList()
  },
  watch: {
    'arm_state': {
      handler(newVal) {
        this.getItemList(1)
      },
      deep: true,
    },
    'customer': {
      handler(newVal) {
        this.getItemList(1)
      },
      deep: true,
    },
  },
  methods: {
    getCustomer() {
      getCustomer().then(( data ) => {
        this.customer_options = data.customers.map(item => {
          const { name, id } = item
          return {
            label: name,
            value: id,
          }
        })
      })
    },
    getArmState() { // get arm state
      getDeviceState().then(( data ) => {
        self.arm_state_options = data.data.map(item => {
          const [value, label] = item
          return {
            value, label,
          }
        })
      })
    },
    getItemList(page=this.curPage,page_size=this.pageSize) { // get table list
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
      getArms(urlParams).then((data) => {
        if (data.code === 20200) {
          const { results = [], count = 0, page_size = this.pageSize } = data.data
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
              value: id, label: name,
            }
          })
        }
        
      })
    },
    saveItem() {
      // serial number is required
      if (!this.item.serial_number) {
        this.$message({
          type: 'error',
          message: 'Serial Number is required',
        })
        return
      }

      let url = ''
      let { id } = this.item
      let method = ''
      if (id) {// is not new
        url = `/api/v1/robot/${ this.isEdit ? `arm` : `armx`}/${ id }/`
        method = 'Put'
        this.item.is_deleted = false
      } else {// create new item
        url = `/api/v1/robot/${this.isEdit ? `arm/${ id }`: 'arms/' }`
        method = this.isEdit ? 'PUT': 'POST'
      }
      request({
        method,
        url,
        data: this.item,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }).then(( data ) => {
        this.saveItemCallback()
      })
    },
    downloadItems() {
      request({
        url: '/api/v1/robot/arms/',
        type: 'get',
      }).then((data) => {
        if (data.code === 20200) {
          const { results = [] } = data.data
          const items = results
          let csv = [
            ['No.', 'Serial Number', 'Type', 'State', 'Customer', ],
          ]
          for(let i = 0; i < items.length; i++) {
            let row = [i + 1, items[i].serial_number, items[i].type_name, items[i].state_name, items[i].customer_id, ]
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

<style lang='scss' scoped>

</style>
