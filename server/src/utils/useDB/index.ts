import { gConsole, cronJob } from "../index";
import * as fs from "fs";
import * as path from "path";
import { v4 as uuid } from "uuid";

type RecordItem = Record<string, any>;
type RecordExclude = string[];
interface SearchParams {
  where?: RecordItem;
  exclude?: RecordExclude;
}
interface UpdateRes {
  isSuccess: boolean;
  record?: RecordItem;
}
export class DBTable {
  public libName: string;
  public name: string;
  public version: number;
  public createTime: string;
  public updateTime: string;
  public body: Record<string, RecordItem>;
  public type: "obj" | "list";
  public maxIndex: number;
  public primaryKey: string;
  public saveInterval: number;
  constructor(options: Partial<DBTable>) {
    this.libName = options.libName;
    this.name = options.name;
    this.version = options.version || 1;
    this.createTime = options.createTime || new Date().toLocaleString();
    this.updateTime = options.updateTime || new Date().toLocaleString();
    this.body = options.body || {};
    this.type = options.type || "list";
    this.primaryKey = options.primaryKey || "id";
    this.saveInterval =
      options.saveInterval || +process.env.SAVE_INTERVAL || 5 * 60 * 1000;
    this.maxIndex = options.maxIndex || 0;
  }
  private whereFilter(row: RecordItem, where?: RecordItem) {
    return Object.keys(where).every(key => {
      return where[key] === row[key];
    });
  }
  private attributeExclude(row?: RecordItem, exclude?: RecordExclude) {
    return DBTable.attributeExclude(row, exclude);
  }
  public static attributeExclude(row?: RecordItem, exclude?: RecordExclude) {
    if (!row) return void 0;
    const excludeObj = {};
    exclude && exclude.forEach(k => (excludeObj[k] = void 0));
    return { ...row, ...excludeObj };
  }
  public findArr(searchParams: SearchParams) {
    const { where, exclude } = searchParams;
    const bodyList = Object.values(this.body);
    return bodyList.reduce((acc, row) => {
      if (where) {
        const isSame = this.whereFilter(row, where);
        if (!isSame) return acc;
      }
      acc.push(this.attributeExclude(row, exclude));
      return acc;
    }, []);
  }
  public findOne(searchParams: SearchParams) {
    const { where, exclude } = searchParams;
    const bodyList = Object.values(this.body);
    if (where) {
      const record = bodyList.find(m => {
        return this.whereFilter(m, where);
      });
      return this.attributeExclude(record, exclude);
    }
    return void 0;
  }
  public find(searchParams: SearchParams) {
    const { where, exclude } = searchParams;
    const bodyKeys = Object.keys(this.body);
    const res = {};
    bodyKeys.forEach(k => {
      const m = this.body[k];
      if (where) {
        const isSame = this.whereFilter(m, where);
        if (!isSame) return;
      }
      res[k] = this.attributeExclude(m, exclude);
    });
    return res;
  }
  public findByPrimaryKey(key: number | string, exclude?: RecordExclude) {
    return this.attributeExclude(this.body[key], exclude);
  }
  public add(data: any) {
    if (this.type === "list") data[this.primaryKey] = ++this.maxIndex;
    if ([null, void 0].includes(data[this.primaryKey]))
      data[this.primaryKey] = uuid();
    if (data[this.primaryKey] in this.body) throw new Error("主键重复");
    this.body[data[this.primaryKey]] = data;
  }
  private refreshUpdateTime() {
    this.updateTime = new Date().toLocaleString();
  }
  public updateByPrimaryKey(data: any, key: number | string): UpdateRes {
    this.refreshUpdateTime();
    const item = this.findByPrimaryKey(key);
    if (item) {
      Object.keys(data).forEach(k => {
        if (data[k] !== void 0) item[k] = data[k];
      });
      this.body[key] = item;
      return { isSuccess: true, record: item };
    }
    return { isSuccess: false };
  }
  public length() {
    return Object.keys(this.body).length;
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
      cronJob.addInterval(
        `WRITE_TABLE_${libName}_${table.name}`,
        () => {
          const content = this.getTable(libName, table.name);
          if (content) {
            fs.writeFileSync(
              tablePath,
              JSON.stringify(this.getTable(libName, table.name))
            );
          }
          gConsole.color(`写入了${libName}_${table.name}`, "magentaBG");
        },
        tablesCache[table.name].saveInterval
      );
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
      throw new Error(`表${tableName}不存在`);
    }
    throw new Error(`库${libName}不存在`);
  }
}
export const database = new JSONDB();
