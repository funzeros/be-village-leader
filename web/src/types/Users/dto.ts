export class LoginDTO {
  name = "";
  password = "";
}

export class RegDTO extends LoginDTO {
  confirmPassword = "";
}

export class UserInfoDTO implements UserInfoVO {
  id = 0;
  name = "";
  token = "";
  coin = 0; // 金币
  chip = 0; // 碎片
  exp = 0; // 经验
  medal = 0; // 奖章
  roleP: GObj = { x: 0, y: 0 };
  keyPools: string[] = [];
}

export class BasePropertyDTO implements Partial<BasePropertyVO> {
  public str?: number; // 力量
  public vit?: number; // 体质
  public dex?: number; // 敏捷
  public hp?: number; // 血量
  public atk?: number; // 攻击
  public def?: number; // 防御
  public as?: number; // 攻速
  public dod?: number; // 回避
  public hit?: number; // 命中
  public cri?: number; // 暴击率
  public crd?: number; // 暴击伤害
  public add?: number; // 附加伤害
  public fin?: number; // 最终伤害
  public red?: number; // 免伤
  public ign?: number; // 无视防御
  public fen?: number; // 火强
  public fre?: number; // 火抗
  public ien?: number; // 冰强
  public ire?: number; // 冰抗
  public len?: number; // 光强
  public lre?: number; // 光抗
  public den?: number; // 暗强
  public dre?: number; // 暗抗
  constructor(isFill = false) {
    if (!isFill) return;
    const propStrList = [
      "str",
      "vit",
      "dex",
      "hp",
      "atk",
      "def",
      "as",
      "dod",
      "hit",
      "cri",
      "crd",
      "add",
      "fin",
      "red",
      "ign",
      "fen",
      "fre",
      "ien",
      "ire",
      "len",
      "lre",
      "den",
      "dre"
    ];
    propStrList.forEach(m => {
      this[m as keyof BasePropertyVO] = 0;
    });
    return;
  }
}
