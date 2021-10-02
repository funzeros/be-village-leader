<template>
  <div class="caption-wrap">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    const methods = {};
    return {
      ...methods
    };
  }
});
</script>
<style lang="scss" scoped>
.caption-wrap {
  height: 100%;
  overflow: hidden;
}
</style>
