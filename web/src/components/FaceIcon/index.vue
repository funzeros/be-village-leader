<template>
  <svg class="icon" aria-hidden="true" :style="{ fontSize: size }">
    <use :xlink:href="'#' + value"></use>
  </svg>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FaceIcon",
  props: {
    value: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: "20px"
    }
  },
  setup() {
    return {};
  }
});
</script>
