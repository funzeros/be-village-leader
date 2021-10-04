import { App, Component } from "vue";

// common
import GButton from "/@/components/common/Button.vue";
import GImg from "/@/components/common/Image.vue";
import GDrawer from "/@/components/common/Drawer.vue";
// emojiIcon
import EmojiIcon from "/@/components/emojiIcon/index.vue";
// form
import GInput from "/@/components/form/Input.vue";
import GFormItem from "/@/components/form/FormItem.vue";
import GForm from "/@/components/form/Form.vue";
const components: Component[] = [
  // common
  GImg,
  GButton,
  GDrawer,
  // emojiIcon
  EmojiIcon,
  // form
  GInput,
  GFormItem,
  GForm
];

const installIepComponents = (app: App<Element>) => {
  components.forEach(component => {
    app.component(component.name as string, component);
  });
};

export { installIepComponents };
