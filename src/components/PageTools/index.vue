<template>
  <el-card class="page-tools">
    <el-row type="flex" align="middle">
      <el-col>
        <el-tag>
          <i class="el-icon-info"></i>
          <slot name="left-tag" />
        </el-tag>
      </el-col>
      <el-col>
        <el-row type="flex" justify="end">
          <slot name="right" />
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
    name:'PageTools',
  props: {
    leftIcon: {
      type: String,
      default: 'el-icon-eleme'
    },
    right: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.page-tools {
  margin: 10px 0;
  .before {
    line-height: 34px;
    i {
      margin-right: 5px;
      color: #409eff;
    }
    display: inline-block;
    padding: 0px 10px;
    border-radius: 3px;
    border: 1px solid rgba(145, 213, 255, 1);
    background: rgba(230, 247, 255, 1);
  }
}
</style>
