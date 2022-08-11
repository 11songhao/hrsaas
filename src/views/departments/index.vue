<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <TreeTools @add="dialogVisible=true" :treeNode="company" :isRoot="true" />
        <el-tree :data="treeData" :props="defaultProps" default-expand-all>
          <template v-slot="{ data }">
            <TreeTools ref="'addDept" @edit="showEdit" @add="showAddDept" :treeNode="data" @remove="loadDepats" />
          </template>
        </el-tree>
      </el-card>
    </div>

    <AddDept :visible.sync="dialogVisible" :currentNode='currentNode'/>
  </div>
</template>

<script>
import TreeTools from './commponents/tree-tools'
import AddDept from './commponents/add-dept.vue'
import { getDeptsApi } from '@/api/departments'
import { transListToTree } from '@/utils'
export default {
  data() {
    return {
      dialogVisible: false,
      currentNode:{},
      treeData: [
        {
          name: '总裁办',
          children: [{ name: '董事会' }]
        },
        { name: '行政部' },
        { name: '人事部' }
      ],
      defaultProps: {
        label: 'name'
        // children: 'child'
      },
      company: {
        name: '传智教育',
        manager: '负责人'
      }
    }
  },
  components: {
    TreeTools,
    AddDept
  },
  created() {
    this.loadDepats()
  },
  methods: {
    async loadDepats() {
      const res = await getDeptsApi()
      console.log(res)
      this.treeData = transListToTree(res.depts, '')
    },
    showAddDept(val){
      this.dialogVisible=true
      this.currentNode = val
    },
    showEdit(){
      this.dialogVisible=true
      this.$refs.addDept.getDeptByid()
    }
  }
}
</script>

<style scoped lang="less"></style>
