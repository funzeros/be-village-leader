import { gConsole } from "..";
import * as fs from "fs";
import * as path from "path";

export class DBTable {
  public libName: string;
  public name: string;
  public version: number;
  public createTime: string;
  public updateTime: string;
  public body: Record<string, any>;
  constructor(options: Partial<DBTable>) {
    this.libName = options.libName;
    this.name = options.name;
    this.version = options.version || 1;
    this.createTime = options.createTime || new Date().toLocaleString();
    this.updateTime = options.updateTime || new Date().toLocaleString();
    this.body = options.body || {};
  }
  public findArr(searchParams: { where?: Record<string, any> }) {
    const { where } = searchParams;
    const bodyList = Object.values(this.body);
    if (where) {
      return bodyList.filter(m => {
        return Object.keys(where).every(key => {
          return where[key] === m[key];
        });
      });
    }
    return bodyList;
  }
  public findOne(searchParams: { where?: Record<string, any> }) {
    const { where } = searchParams;
    const bodyList = Object.values(this.body);
    if (where) {
      return bodyList.find(m => {
        return Object.keys(where).every(key => {
          return where[key] === m[key];
        });
      });
    }
    return void 0;
  }
  public find(searchParams: { where?: Record<string, any> }) {
    const { where } = searchParams;
    const bodyKeys = Object.keys(this.body);
    if (where) {
      const res = {};
      bodyKeys.forEach(k => {
        const m = this.body[k];
        const isSame = Object.keys(where).every(key => {
          return where[key] === m[key];
        });
        if (isSame) res[k] = m;
      });
      return res;
    }
    return this.body;
  }
  public static generate(json: string) {
    const oldTable = JSON.parse(json) as DBTable;
    return new DBTable(oldTable);
  }
}
interface LibOptions {
  libName: string;
  tables: Partial<DBTable>[];
}
interface LibCache {
  libName: string;
  tables: { [k: string]: DBTable };
}
export class JSONDB {
  public basePath: string;
  public dbCache: Map<string, LibCache> = new Map();
  constructor() {
    gConsole.color("JSONDB 已启动", "greenBG");
  }
  public dbInit(basePath: string) {
    this.basePath = basePath;
    // 数据库文件夹是否存在，若不存在则创建
    const isWrapDirExists = fs.existsSync(this.basePath);
    if (!isWrapDirExists) fs.mkdirSync(this.basePath);
    gConsole.color("JSONDB 初始化完成", "greenBG");
  }
  public libInit(options: LibOptions) {
    // 库文件夹是否存在，若不存在则创建
    const libName = options.libName;
    const libPath = path.join(this.basePath, libName);
    const isLibExists = fs.existsSync(libPath);
    if (!isLibExists) fs.mkdirSync(libPath);
    gConsole.color(`库${libName} 初始化完成`, "greenBG");
    // 表缓存
    const tablesCache = {};
    // 表文件是否存在，若不存在则创建
    options.tables.forEach(table => {
      const tablePath = path.join(this.basePath, libName, `${table.name}.json`);
      const isTabelExists = fs.existsSync(tablePath);
      if (!isTabelExists)
        fs.writeFileSync(
          tablePath,
          JSON.stringify(new DBTable({ libName, ...table }))
        );
      // 读取表至表缓存
      const fileUTF8 = fs.readFileSync(tablePath, "utf8");
      tablesCache[table.name] = DBTable.generate(fileUTF8);
      gConsole.color(`表${table.name} 初始化完成`, "greenBG");
    });
    // 表缓存添加至库缓存
    this.dbCache.set(libName, { libName, tables: tablesCache });
  }
  public getTable(libName: string, tableName: string) {
    if (this.dbCache.has(libName)) {
      const lib = this.dbCache.get(libName);
      const table = lib.tables[tableName];
      if (table) return table;
      throw Error("该表不存在");
    }
    throw Error("该库不存在");
  }
}
export const database = new JSONDB();
