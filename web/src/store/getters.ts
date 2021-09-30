import { GetterTree } from "vuex";
import { KBWS } from "../hooks/useWs";
import { RootState } from "./types";

export type Getters = {
  userInfo(state: RootState): UserInfoVO | undefined;
  KBWSIns(state: RootState): KBWS | undefined;
};

export const getters: GetterTree<RootState, RootState> & Getters = {
  userInfo: state => state.user.userInfo,
  KBWSIns: state => state.user.KBWSIns
};
