type KBFn = (ws: WebSocket, res: KBWSVO) => void;
interface KBWSTypes {
  connect: KBFn[];
  msg: KBFn[];
  close: KBFn[];
  sys: KBFn[];
  error: KBFn[];
  syncUsers: KBFn[];
  chat: KBFn[];
  syncDirective: KBFn[];
  offline: KBFn[];
  [key: string]: KBFn[];
}
type KBWSType = keyof KBWSTypes;

interface KBWSVO<T = GObj> {
  code: number; // 状态码
  data: T; // 数据体
  type: KBWSType; // 请求类型
  sourceId: number; // 请求来源id
  targetId: number; // 请求目标id
}

interface ChatVO {
  content: string;
  id: number;
  name: string;
  time: string;
}
