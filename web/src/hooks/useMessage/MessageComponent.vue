<template>
  <ul class="message-list">
    <li
      :class="`message-item ${setClass(item.type)}`"
      v-for="(item, index) in messageList"
      :key="index"
    >
      {{ item.title }}
    </li>
  </ul>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    messageList: {
      type: Array as PropType<MessageList[]>,
      default: () => []
    }
  },
  setup() {
    function setClass(type: string): string {
      if (type === "info") {
        return "message-info-item";
      } else if (type === "warning") {
        return "message-warning-item";
      } else if (type === "success") {
        return "message-success-item";
      } else if (type === "error") {
        return "message-error-item";
      }
      return "";
    }
    return { setClass };
  }
});
</script>

<style lang="scss" scoped>
.message-list {
  position: fixed;
  top: 10px;
  width: 375px;
  z-index: 1000;
  text-align: right;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  .message-item {
    padding: 8px 20px;
    border: 1px solid #e9e9eb;
    margin-bottom: 12px;
    background-color: #f4f4f5;
    font-size: 16px;
    color: #909399;
    text-align: left;
    box-shadow: 0 1px 10px 0 hsla(0, 0%, 80.4%, 0.5);
    border-radius: 10px;
    cursor: default;
  }
  .message-info-item {
    border: 1px solid #a0cfff;
    background-color: #ecf5ff;
    color: #409eff;
  }
  .message-error-item {
    border: 1px solid #fde2e2;
    background-color: #fef0f0;
    color: #f56c6c;
  }
  .message-warning-item {
    border: 1px solid #faecd8;
    background-color: #fdf6ec;
    color: #e6a23c;
  }
  .message-success-item {
    border: 1px solid #e1f3d8;
    background-color: #f0f9eb;
    color: #67c23a;
  }
}
</style>
