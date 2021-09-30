import { actions } from "./actions";
import state from "./state";
import { mutations } from "./mutations";
import { UserState } from "./types";
import { Module } from "vuex";
import { RootState } from "/@/store/types";

const userModule: Module<UserState, RootState> = {
  actions,
  state,
  mutations
};

export default userModule;
