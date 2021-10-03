<script lang="tsx">
import { defineComponent } from "vue";
const gForm = defineComponent({
  name: "GForm",
  setup(_, { slots }) {
    return () => {
      return <form class="g-form">{slots.default && slots.default()}</form>;
    };
  }
});
export default gForm;
export type GFormRef = typeof gForm;
</script>
