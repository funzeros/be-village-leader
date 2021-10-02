<template>
  <div class="g-input inline-block">
    <input
      :value="modelValue"
      @change="handleChange"
      class="g-input_inner"
      v-bind="$attrs"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "GInput",
  inheritAttrs: false,
  props: {
    modelValue: {
      type: String,
      required: true
    }
  },
  setup(_, { emit }) {
    const handleChange = (e: InputEvent) => {
      emit("update:modelValue", (e.target as HTMLInputElement).value);
    };
    return { handleChange };
  }
});
</script>
<style lang="scss" scoped>
.g-input {
  width: 100%;
  &_inner {
    width: 100%;
    border: none;
    line-height: 20px;
    font-size: 20px;
    padding: 4px 8px;
    &:focus {
      outline: none;
    }
  }
}
</style>
