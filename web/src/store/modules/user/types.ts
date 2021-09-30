import { Game } from "/@/hooks/useGame";
import { KBWS } from "/@/hooks/useWs";
import { UserInfoDTO } from "/@/types/Users/dto";

// types.ts
export interface UserState {
  userInfo?: UserInfoDTO;
  dressedEquips: DressedEquips;
  game?: Game;
  KBWSIns?: KBWS; // KB WS 实例
  msgList: ChatVO[];
}
