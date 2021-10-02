<template>
  <button class="g-button" :class="[`g-button-${type}`]" v-bind="$attrs">
    <slot></slot>
  </button>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "GButton",
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: "primary"
    }
  },
  setup() {
    return {};
  }
});
</script>
<style lang="scss" scoped>
$primary: #000;
$button-text-color: #fff;
.g-button {
  display: inline-block;
  font-size: 16px;
  padding: 8px 16px;
  -webkit-appearance: none;
  appearance: none;
  background-color: $primary;
  color: $button-text-color;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  position: relative;
  transition: transform 0.1s ease-in;
  &-primary {
    background-color: $primary;
  }
  &:focus {
    outline: 0;
  }
  &:active {
    transform: scale(0.9);
  }
}
</style>
