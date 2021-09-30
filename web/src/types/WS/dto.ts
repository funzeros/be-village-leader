export class KBWSDTO<T = GObj> implements KBWSVO {
  constructor(options: Partial<KBWSVO<T>>) {
    Object.assign(this, options);
  }
  code = 0; // 状态码
  data!: T; // 数据体
  type!: KBWSType; // 请求类型
  sourceId = 0; // 请求来源id
  targetId = 0; // 请求目标id
  toSDTO() {
    return JSON.stringify(this);
  }
}
