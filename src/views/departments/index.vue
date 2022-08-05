<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <TreeTools :treeNode="company" :isRoot="true"/>
        <el-tree :data="treeData" :props="defaultProps" default-expand-all>
          <template v-slot="{ data }">
            <TreeTools :treeNode="data" />
          </template>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from './commponents/tree-tools'
export default {
  data() {
    return {
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
    TreeTools
  },
  methods: {}
}
</script>

<style scoped lang="less"></style>
