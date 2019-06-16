<template>
  <div>
    <a-button v-bind:class="[type]" type="type">
      <a-icon type="icon" />
      <slot></slot>
    </a-button>
  </div>
</template>
<script>
export default {
  props: {
    'icon': {
      type: String,
      required: false
    },
    'type': {
      type: String,
      default: 'default',
      required: false,
      validator: function (value) {
        return ['default', 'success', 'warning', 'info', 'danger', 'primary'].indexOf(value) !== -1
      }
    }
  }
}

</script>
<style scoped lang="scss">
.default {
}

.primary {
  color: #fff;
  background: #409eff;
  border-color: #409eff;
}

.info {
  color: #fff;
  background-color: #909399;
  border-color: #909399;
}

.success {
  color: #fff;
  background-color: #67c23a;
  border-color: #67c23a;
}

.warning,
.warn {
  color: #fff;
  background-color: #e6a23c;
  border-color: #e6a23c;
}

.danger,
.error {
  color: #fff;
  background-color: #f56c6c;
  border-color: #f56c6c;
}

// .medium {

// }

// .small {

// }

// .mini {

// }

</style>
