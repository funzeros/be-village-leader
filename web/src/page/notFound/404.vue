<script lang="tsx">
import { defineComponent } from "vue";
import { defaultRoutePath } from "/@/const/path";
import { useGRoute } from "/@/hooks";
export default defineComponent({
  setup() {
    const { pushRouteFullpath } = useGRoute();
    const handleBack = () => {
      pushRouteFullpath(defaultRoutePath);
    };
    return () => {
      return (
        <div class="fz-32 height-full flex flex-center-center flex-dc">
          <div class="m-b-24">走丢了啦</div>
          <div class="m-b-24">都是你害的</div>
          <div class="m-b-24">拜托</div>
          <g-button onClick={handleBack}>返回主页</g-button>
        </div>
      );
    };
  }
});
</script>
