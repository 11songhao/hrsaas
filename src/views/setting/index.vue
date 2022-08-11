<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row style="height: 60px">
              <el-button
                icon="el-icon-plus"
                size="small"
                type="primary"
                @click="showDialog = true"
                >新增角色</el-button
              >
            </el-row>
            <!-- 表格 -->
            <el-table :data="tableData" border="">
              <el-table-column type="index" label="序号" width="120" />
              <el-table-column prop="name" label="角色名称" width="240" />
              <el-table-column prop="description" label="描述" />
              <el-table-column label="操作">
                <el-button size="small" type="success">分配权限</el-button>
                <el-button size="small" type="primary">编辑</el-button>
                <el-button size="small" type="danger">删除</el-button>
              </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <el-row
              type="flex"
              justify="center"
              align="middle"
              style="height: 60px"
            >
              <!-- 分页组件 -->
              <el-pagination
                layout="sizes,prev,pager,next"
                :total="total"
                :page-size="pagesize"
                :page-sizes="[3, 5, 15, 20]"
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
              />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form label-width="120px" style="margin-top: 50px">
              <el-form-item label="公司名称">
                <el-input disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  type="textarea"
                  :rows="3"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <el-dialog @close="dialogClose" title="新增角色" :visible.sync="showDialog">
      <el-form
        :model="addRoleFrom"
        :rules="addRoleFromRules"
        ref="roleForm"
        label-width="120px"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="addRoleFrom.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="addRoleFrom.region"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部 -->
      <span slot="footer" type="flex" justify="center">
        <el-button size="small" @click="btnCancel">取消</el-button>
        <el-button size="small" type="primary" @click="onAddRole"
          >确定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleApi, addRoleApi } from '@/api/role'
import { getCompanyInfo } from "@/api/setting";
export default {
  data() {
    return {
      roleForm : {
        name: '',
        description: ''
      },
      addRoleFrom: {
        name: '',
        region: ''
      },
      form:'',
      showDialog: false,
      tableData: [],
      total: 0,
      pagesize: 3,
      page: 1,
      addRoleFromRules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }]
      }
    }
  },

  created() {
    this.getRoles()
    this.getCompanyInfo()
  },

  methods: {
    async getRoles() {
      const { rows, total } = await getRoleApi({
        page: this.page,
        pagesize: this.pagesize
      })
      this.tableData = rows
      this.total = total
      console.log(rows)
    },
    handleCurrentChange(val) {
      this.page = val
      this.getRoles()
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.getRoles()
    },
    btnCancel() {
      this.showDialog = false
    },
    async onAddRole() {
      await this.$refs.roleForm.validate()
      await addRoleApi(this.addRoleFrom)
      this.$message('添加成功')
      this.getRoles()
      this.showDialog = false
    },
    dialogClose() {
      this.$refs.form.resetFields()
      this.addRoleFrom.region = ''
    },
    async getCompanyInfo(){
      const res = await getCompanyInfo(
        this.$$store.state.user.userInfo.companyId
      )
      console.log(res);
    }
  }
}
</script>

<style scoped lang="less"></style>
