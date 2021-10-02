<script lang="tsx">
import { defineComponent } from "vue";
export default defineComponent({
  name: "GFormItem",
  props: {
    label: {
      type: String,
      default: ""
    },
    labelWidth: {
      type: String,
      default: ""
    },
    center: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots }) {
    return () => {
      return (
        <div class="g-form-item flex align-items-center m-t-5 m-b-15">
          <label class="g-form-item_label" style={`width: ${props.labelWidth}`}>
            {props.label}
          </label>
          <div
            class={`g-form-item_inner flex-1 ${
              (props.center && "flex justify-content-center") || ""
            }`}
          >
            {slots.default && slots.default()}
          </div>
        </div>
      );
    };
  }
});
</script>
