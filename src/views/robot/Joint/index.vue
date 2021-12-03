<template>
  <div>
    <fvr-font>
      现象:<br>
      表格的overflow会显示popconfirm中内容<br>
      重现步骤：<br>
      1. 当表格组件使用show-overflow-tooltip的时候<br>
      2. 该table-column的插槽中包含了popconfirm<br>
      3. 该table-column宽度不足<br>
      4. popconfirm中不包含任何的文字信息<br>
      原因：<br>
      表格的show-overflow-tooltip会显示该column下的最后一个被搜索到的文字信息
    </fvr-font>
    <el-table
      :data="tableData"
      style="width: 500px"
    >
      <el-table-column
        prop="user"
        label="User"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        label="Name"
        prop="name"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        label="Action"
        fixed="right"
        width="60px"
      >
        <el-popconfirm
          v-if="true"
          confirm-button-text="confirm"
          cancel-button-text="cancel"
          title="popconfirm title"
        >
          <template
            #reference
          >
            <el-tooltip
              v-if="true"
              effect="light"
              :open-delay="1000"
              :disabled="true"
            >
              <span>
                <el-button icon="el-icon-user" />
              </span>
            </el-tooltip>
            <el-button v-else>
              测试按钮3
            </el-button>
          </template>
        </el-popconfirm>
        <template v-else>
          <el-tooltip
            effect="light"
            open-delay="1000"
          >
            <span>
              <el-button>
                测试按钮1
              </el-button>
            </span>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import fvrFont from '@/components/Fvr/Font'

export default {
  name: 'Joint',
  components: {
    fvrFont
  },
  data() {
    return {
      tableData: Array.apply(null, { length: 5 }).map((item, index) => ({
        user: 'user-' + (index + 1),
        name: 'name-' + (index + 1)
      }))
    }
  }
}
</script>
