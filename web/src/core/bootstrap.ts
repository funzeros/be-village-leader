import { ActionTypes } from "../store/modules/user/action-types";
import { useStore } from "/@/store";

export default function initializer() {
  const store = useStore();
  store.dispatch(ActionTypes.TOKEN_AUTH);
}
