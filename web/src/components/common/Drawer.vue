<template>
  <teleport to="body">
    <div
      class="g-drawer to-body"
      :style="{ width }"
      :class="{ show: modelValue }"
    >
      <slot></slot>
    </div>
  </teleport>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "GDrawer",
  props: {
    modelValue: {
      type: Boolean,
      required: true
    },
    width: {
      type: String,
      default: "100%"
    }
  },
  setup() {
    return {};
  }
});
</script>
<style lang="scss" scoped>
.g-drawer {
  transition: transform 0.3s ease-in-out;
  padding: 20px;
  &.to-body {
    position: absolute;
    height: 100%;
    background: var(--background-color);
    top: 0;
    right: 0;
    transform: translateX(100%);
  }
  &.show {
    transform: translateX(0);
    box-shadow: -4px 0 4px #999;
  }
}
</style>
