import { MutationTypes } from "./mutation-types";
import { UserState } from "./types";
import storage from "store";
import { MutationTree } from "vuex";
import { objEncodeToStr, strDecodeToObj } from "/@/utils/encrypt";
import { mergeProperties } from "/@/utils/common";
import { UserInfo } from "local-common-util";

export type Mutations<S = UserState> = {
  [MutationTypes.SET_USERINFO](state: S, payload: UserInfo): void;
  [MutationTypes.CLEAR_USERINFO](state: S): void;
  [MutationTypes.GET_USERINFO](state: S): void;
};

export const mutations: MutationTree<UserState> & Mutations = {
  [MutationTypes.SET_USERINFO](state, payload) {
    state.userInfo = mergeProperties(new UserInfo(), payload);
    storage.set(MutationTypes.SET_USERINFO, objEncodeToStr(state.userInfo));
  },
  [MutationTypes.CLEAR_USERINFO](state) {
    state.userInfo = undefined;
    storage.remove(MutationTypes.SET_USERINFO);
  },
  [MutationTypes.GET_USERINFO](state) {
    const str = storage.get(MutationTypes.SET_USERINFO);
    if (str) {
      const obj = strDecodeToObj(str);
      state.userInfo = obj;
    }
  }
};
