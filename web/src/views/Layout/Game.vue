<template>
  <div class="game-wrap">
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
.game-wrap {
  height: 100%;
  overflow: hidden;
}
</style>
