<script lang="tsx">
import { defineComponent } from "vue";
const gForm = defineComponent({
  name: "GForm",
  setup(_, { slots }) {
    return () => {
      return <div class="g-form">{slots.default && slots.default()}</div>;
    };
  }
});
export default gForm;
export type GFormRef = typeof gForm;
</script>
