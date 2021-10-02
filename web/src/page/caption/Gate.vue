<script lang="tsx">
import { defineComponent } from "vue";
import { loginRoutePath } from "/@/const/path";
import { useGRoute } from "/@/hooks";
export default defineComponent({
  setup() {
    const title = "我要当$长";
    const { pushRouteFullpath } = useGRoute();
    const handleStart = () => {
      pushRouteFullpath(loginRoutePath);
    };
    return () => {
      const renderTitle = title.split("").map(v => {
        return v === "$" ? (
          <g-img
            class="anime-breath"
            src="/img/logo.png"
            size={["6rem", "6rem"]}
          />
        ) : (
          <div class="fz-40 ">{v}</div>
        );
      });
      return (
        <div
          class="gate height-full flex flex-dc flex-center-center"
          onClick={handleStart}
        >
          {renderTitle}
        </div>
      );
    };
  }
});
</script>
<style lang="scss" scoped></style>
