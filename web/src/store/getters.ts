import { UserInfo } from "local-common-util";
import { GetterTree } from "vuex";
import { RootState } from "./types";

export type Getters = {
  userInfo(state: RootState): UserInfo | undefined;
};

export const getters: GetterTree<RootState, RootState> & Getters = {
  userInfo: state => state.user.userInfo
};
