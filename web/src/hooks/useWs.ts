import { router } from "/@/router";
import { useStore } from "/@/store";
import { ActionTypes } from "/@/store/modules/user/action-types";
import { UserInfoDTO } from "/@/types/Users/dto";
import { KBWSDTO } from "/@/types/WS/dto";
import { MutationTypes } from "../store/modules/user/mutation-types";

const wsFunc: Partial<KBWSTypes> = {
  connect: [
    (ws, res) => {
      console.log(res.data.msg);
    }
  ],
  syncUsers: [],
  error: [
    (ws, res) => {
      console.error(new Error(res.data.msg));
    }
  ],
  chat: [
    (ws, res) => {
      const store = useStore();
      store.commit(MutationTypes.PUSH_MSG, res.data);
    }
  ],
  syncDirective: [],
  offline: []
};
export class KBWS {
  user: UserInfoDTO;
  ws?: WebSocket;
  constructor(user: UserInfoDTO) {
    this.user = user;
  }
  // 注册ws
  createWs() {
    const wsUrl =
      (import.meta.env.VITE_BASE_WS as string) ||
      "ws://47.103.218.109:10051/kbws";
    const ws = new WebSocket(wsUrl);
    this.ws = ws;
    return ws;
  }
  // ws连接
  connectWs() {
    if (!this.ws) return //gMessage("未创建ws服务，无法连接", "error");
    const ws = this.ws;
    ws.onopen = () => {
      this.WSFirstConnect(ws);
    };
    ws.onmessage = e => {
      const res = JSON.parse(e.data) as KBWSVO;
      const fnList = wsFunc[res.type];
      if (fnList && fnList.length) fnList.forEach(fn => fn(ws, res));
    };
    ws.onclose = () => {
      const store = useStore();
      store.dispatch(ActionTypes.CLEAR_WS);
      router.push({ name: "标题" });
    };
    ws.onerror = () => {
      //gMessage("很抱歉，在线服务连接异常，请稍后再试", "error");
    };
  }
  // json转str
  JSON(options: Partial<KBWSVO>) {
    options.sourceId = this.user.id;
    return new KBWSDTO(options).toSDTO();
  }
  // ws首次连接注册信息
  WSFirstConnect(ws: WebSocket) {
    ws.send(
      this.JSON({
        data: this.user,
        type: "connect"
      })
    );
  }
  // ws 关闭
  close() {
    this.ws?.close();
  }
  // ws 发送消息
  send<T>(options: Partial<KBWSVO<T>>) {
    this.ws?.send(this.JSON(options));
  }
  on(name: KBWSType, cb: KBFn) {
    if (!wsFunc[name]) wsFunc[name] = [];
    wsFunc[name]?.push(cb);
  }
  remove(name: KBWSType, cb: KBFn) {
    if (!wsFunc[name]) return;
    const index = wsFunc[name]?.findIndex(fn => fn === cb) as number;
    if (index > -1) wsFunc[name]?.splice(index, 1);
  }
}
