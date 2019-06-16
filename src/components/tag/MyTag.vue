<template>
  <div>
    <a-tag v-bind:class="[type, size]">
      <slot></slot>
    </a-tag>
  </div>
</template>
<script>
export default {
  props: {
    'type': {
      type: String,
      default: 'info',
      required: false,
      validator: function (value) {
        return ['success', 'warning', 'info', 'danger', 'error', 'warn'].indexOf(value) !== -1
      }
    },
    'size': {
      type: String,
      required: false,
      default: 'medium',
      validator: function (val) {
        return ['medium', 'small', 'mini'].indexOf(val) !== -1
      }
    }
  }
}

</script>
<style scoped lang="scss">
.info,
.a-tag {
  background-color: rgba(64, 158, 255, .1);
  display: inline-block;
  padding: 0 10px;
  height: 32px;
  line-height: 30px;
  font-size: 12px;
  color: #409eff;
  border-radius: 4px;
  box-sizing: border-box;
  border: 1px solid rgba(64, 158, 255, .2);
  white-space: nowrap;
}

.success {
  background-color: rgba(103, 194, 58, .1);
  border-color: rgba(103, 194, 58, .2);
  color: #67c23a;
}

.warning,
.warn {
  background-color: rgba(230, 162, 60, .1);
  border-color: rgba(230, 162, 60, .2);
  color: #e6a23c;
}

.danger,
.error {
  background-color: rgba(245, 108, 108, .1);
  border-color: rgba(245, 108, 108, .2);
  color: #f56c6c;
}

.medium {
  height: 28px;
  line-height: 26px;
}

.small {
  height: 24px;
  padding: 0 8px;
  line-height: 22px;
}

.mini {
  height: 20px;
  padding: 0 5p;
  line-height: 19px;
}

</style>
