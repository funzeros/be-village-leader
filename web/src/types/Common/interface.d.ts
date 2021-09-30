/* eslint-disable @typescript-eslint/no-explicit-any */
interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>;
}

interface GObj<T = any> {
  [key: string]: T;
  [key: number]: T;
}

interface CommonOption {
  icon: string;
  name: string;
  func: Fn;
  type?: "primary" | "default";
  hidden?: boolean;
}

interface ColumnsMapOption {
  width?: number;
  label: string;
  prop: string;
  type?: "dict" | "dataDict" | "date" | "slot";
  dictName?: string;
  format?: string;
  hidden?: boolean;
  /**
   * default: undefined === false
   */
  complete?: boolean;
}

interface IdName extends GObj {
  id: number | null;
  name: string;
}
interface LabelValue {
  value: string | number | null;
  label: string;
}
interface Attachment extends GObj {
  name: string;
  url: string;
}
interface CommonTree extends GObj {
  children: CommonTree[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EmitType = (event: string, ...args: any[]) => void;

interface DateCell {
  type: string;
  date: Date;
  day: string;
  isSelected: boolean;
}

interface Window {
  isInput: boolean;
}
