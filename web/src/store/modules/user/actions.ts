import { ActionTypes } from "./action-types";
import { RootState } from "/@/store/types";
import { UserState } from "./types";
import { ActionContext, ActionTree } from "vuex";
import { MutationTypes } from "./mutation-types";
import { authTokenReq } from "/@/api/Users";
import { KBWS } from "/@/hooks/useWs";
export type Actions<S = UserState, R = RootState> = {
  [ActionTypes.TOKEN_AUTH]({
    state,
    commit,
    dispatch
  }: ActionContext<S, R>): Promise<boolean>;
  [ActionTypes.INIT_WS]({
    state,
    commit
  }: ActionContext<S, R>): Promise<boolean>;
  [ActionTypes.CLEAR_WS]({ commit }: ActionContext<S, R>): Promise<void>;
};

export const actions: ActionTree<UserState, RootState> & Actions = {
  async [ActionTypes.TOKEN_AUTH]({ state, commit, dispatch }) {
    try {
      commit(MutationTypes.GET_USERINFO);
      if (state.userInfo?.token) {
        const { data } = await authTokenReq();
        if (data) {
          commit(MutationTypes.SET_USERINFO, data);
          // 每次授权后尝试连接ws
          dispatch(ActionTypes.INIT_WS);
          return true;
        }
        commit(MutationTypes.CLEAR_USERINFO);
      }
      return false;
    } catch (error) {
      console.error(new Error(error));
      commit(MutationTypes.CLEAR_USERINFO);
      return false;
    }
  },
  async [ActionTypes.INIT_WS]({ state, commit }) {
    if (!state.userInfo) return false; // 未登录 return
    if (state.KBWSIns) return false; // 若已存在ws return
    const KBWSIns = new KBWS(state.userInfo);
    commit(MutationTypes.SET_WS, KBWSIns);
    KBWSIns.createWs();
    KBWSIns.connectWs();
    return true;
  },
  async [ActionTypes.CLEAR_WS]({ commit }) {
    commit(MutationTypes.CLEAR_WS);
  }
};
