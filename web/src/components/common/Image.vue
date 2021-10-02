<template>
  <div class="g-image inline-block">
    <img class="g-image_inner" v-bind="$attrs" :style="style" />
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
export default defineComponent({
  name: "gImg",
  inheritAttrs: false,
  props: {
    fit: {
      type: String,
      default: "fill"
    },
    size: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const style = computed(() => {
      return {
        "object-fit": props.fit,
        "width": props.size[0],
        "height": props.size[1]
      };
    });
    return { style };
  }
});
</script>
<style lang="scss" scoped>
.g-image {
  &_inner {
    width: 100%;
    height: 100%;
  }
}
</style>
