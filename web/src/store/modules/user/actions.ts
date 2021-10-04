import { ActionTypes } from "./action-types";
import { RootState } from "/@/store/types";
import { UserState } from "./types";
import { ActionContext, ActionTree } from "vuex";
import { MutationTypes } from "./mutation-types";
import { tokenAuthReq } from "/@/api/Users";
export type Actions<S = UserState, R = RootState> = {
  [ActionTypes.TOKEN_AUTH]({
    state,
    commit
  }: ActionContext<S, R>): Promise<boolean>;
};

export const actions: ActionTree<UserState, RootState> & Actions = {
  async [ActionTypes.TOKEN_AUTH]({ state, commit }) {
    try {
      commit(MutationTypes.GET_USERINFO);
      if (state.userInfo?.token) {
        const { data } = await tokenAuthReq();
        if (data) {
          commit(MutationTypes.SET_USERINFO, data);
          return true;
        }
        commit(MutationTypes.CLEAR_USERINFO);
      }
      return false;
    } catch (error) {
      console.error(error);
      commit(MutationTypes.CLEAR_USERINFO);
      return false;
    }
  }
};
