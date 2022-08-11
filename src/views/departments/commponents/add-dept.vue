<template>
  <el-dialog title="添加部门" :visible="visible" width="50%">
    <el-form
      :model="FromData"
      :rules="FromRules"
      ref="form"
      label-width="100px"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="FromData.name" placeholder="输入部门名称"></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="FromData.code" placeholder="输入部门编码"></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          label-width="100px"
          v-model="FromData.manager"
          placeholder="输入部门负责人"
        >
          <el-option
            v-for="item in employees"
            :key="item"
            :label="item.username"
            :value="item.username"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="FromData.introduce"
          placeholder="输入部门介绍"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onclose">取 消</el-button>
      <el-button @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getDeptsApi } from '@/api/departments'
import { getEmployeesApi } from '@/api/employees'
export default {
  data() {
    return {
      FromData: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      employees: [],
      FromRules: {
        name: [
          {
            required: true,
            message: '部门名称不能为空',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
              const isRepeat = this.currentNode.children.some(
                (item) => item.name === value
              )
              isRepeat ? callback(new Error('部门重复')) : callback()
            },
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: '部门编码不能为空',
            trigger: 'blur'
          },
          {
            validator: async (rule, value, callback) => {
              const { depts } = await getDeptsApi()
              const isRepeat = depts.some((item) => item.code === value)
              isRepeat ? callback(new Error('部门编码重复')) : callback()
            },
            trigger: 'blur'
          }
        ],
        manager: [
          {
            required: true,
            message: '部门负责人不能为空',
            trigger: 'change'
          },
        ],
        introduce: [
          {
            required: true,
            message: '部门介绍不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    currentNode: {
      type: Object,
      default: true
    }
  },
  components: {},
  methods: {
    async getEmployeesApi() {
      const res = await getEmployeesApi()
      console.log(res)
      this.employees = res
    },
    onclose(){
      this.$emit('update:visible',false)
    },
    async onSave(){
      await this.$refs.form.validate()
      this.formData.pid=this.currentNode.id
    },
    getDeptByid(){
      console.log(123);
    }
  },
  created() {
    this.getEmployeesApi()
  },
  updated() {},
  mounted() {},
  filters: {},
  computed: {},
  watch: {}
}
</script>
<style lang="less" scoped></style>
