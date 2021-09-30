import { MutationTypes } from "./mutation-types";
import { UserState } from "./types";
import storage from "store";
import { MutationTree } from "vuex";
import { UserInfoDTO } from "/@/types/Users/dto";
import { objEncodeToStr, strDecodeToObj } from "/@/utils/encrypt";
import { Game } from "/@/hooks/useGame";
import { KBWS } from "/@/hooks/useWs";
import { mergeProperties } from "/@/utils/common";

export type Mutations<S = UserState> = {
  [MutationTypes.SET_USERINFO](state: S, payload: UserInfoDTO): void;
  [MutationTypes.CLEAR_USERINFO](state: S): void;
  [MutationTypes.GET_USERINFO](state: S): void;
  [MutationTypes.SET_GAME](state: S, payload: Game): void;
  [MutationTypes.CLEAR_GAME](state: S): void;
  [MutationTypes.SET_WS](state: S, payload: KBWS): void;
  [MutationTypes.CLEAR_WS](state: S): void;
  [MutationTypes.PUSH_MSG](state: S, payload: ChatVO): void;
  [MutationTypes.CLEAR_MSG](state: S): void;
  [MutationTypes.SET_EQUIP](state: S, payload: EquipVO): void;
};

export const mutations: MutationTree<UserState> & Mutations = {
  [MutationTypes.SET_USERINFO](state, payload) {
    state.userInfo = mergeProperties(new UserInfoDTO(), payload);
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
  },
  [MutationTypes.SET_GAME](state, payload) {
    state.game = payload;
  },
  [MutationTypes.CLEAR_GAME](state) {
    state.game?.destroy();
    state.game = undefined;
  },
  [MutationTypes.SET_WS](state, payload) {
    state.KBWSIns = payload;
  },
  [MutationTypes.CLEAR_WS](state) {
    if (!state.KBWSIns) return;
    state.KBWSIns.close();
    state.KBWSIns = undefined;
  },
  [MutationTypes.PUSH_MSG](state, payload) {
    if (state.msgList.length > 100) state.msgList.shift();
    state.msgList.push(payload);
  },
  [MutationTypes.CLEAR_MSG](state) {
    state.msgList.length = 0;
  },
  [MutationTypes.SET_EQUIP](state, payload) {
    state.dressedEquips[payload.type] = payload;
  }
};
