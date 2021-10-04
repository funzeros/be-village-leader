<template>
  <div class="g-input inline-block">
    <input
      :value="modelValue"
      @change="handleChange"
      class="g-input_inner"
      v-bind="$attrs"
      :pattern="pattern"
      ref="inputRef"
      :class="{ disabled }"
    />
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref, onMounted } from "vue";
const gInput = defineComponent({
  name: "GInput",
  inheritAttrs: false,
  props: {
    modelValue: {
      type: String,
      required: true
    },
    onlyNumber: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit, attrs }) {
    const inputRef = ref<HTMLInputElement>();
    const handleChange = (e: InputEvent) => {
      emit("update:modelValue", (e.target as HTMLInputElement).value);
    };
    const pattern = computed(() => {
      return props.onlyNumber ? "[0-9]*" : attrs.pattern;
    });
    const handleFocus = () => {
      inputRef.value?.focus();
    };
    onMounted(() => {
      if (props.autofocus) handleFocus();
    });
    return { inputRef, handleChange, pattern, handleFocus };
  }
});
export default gInput;
export type GInputRefs = InstanceType<typeof gInput>;
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
    background-color: transparent;
    &:focus {
      outline: none;
    }
    &.disabled {
      pointer-events: none;
      opacity: 0.5;
    }
  }
}
</style>
