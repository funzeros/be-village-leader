interface UserInfoVO {
  id: number;
  name: string;
  token: string;
  coin: number;
  chip: number;
  exp: number;
  medal: number;
  roleP: XY;
  keyPools: string[];
}

interface BasePropertyVO {
  str: number; // 力量
  vit: number; // 体质
  dex: number; // 敏捷
  hp: number; // 血量
  atk: number; // 攻击
  def: number; // 防御
  as: number; // 攻速
  dod: number; // 回避
  hit: number; // 命中
  cri: number; // 暴击率
  crd: number; // 暴击伤害
  add: number; // 附加伤害
  fin: number; // 最终伤害
  red: number; // 免伤
  ign: number; // 无视防御
  fen: number; // 火强
  fre: number; // 火抗
  ien: number; // 冰强
  ire: number; // 冰抗
  len: number; // 光强
  lre: number; // 光抗
  den: number; // 暗强
  dre: number; // 暗抗
}
type BaseProps = keyof BasePropertyVO;
