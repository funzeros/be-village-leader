type CodeType = 0 | 1;
export class ApiResult {
  private timestamp: any = Date.now();
  private status: number;
  private message: string;
  private data: any;
  private code: CodeType;

  constructor(
    code: CodeType,
    status: number,
    message = "请求成功",
    data?: any
  ) {
    this.data = data;
    this.status = status;
    this.message = message;
    this.code = code;
  }
  /**
   * 带消息的成功响应
   * @param message 消息体
   * @param data 数据
   */
  public static SUCCESS(data: any, message?: string) {
    return new ApiResult(0, 200, message, data);
  }
  /**
   * 带消息的错误响应
   * @param message 消息体
   * @param data 数据
   */
  public static ERROR(status: number, message: string) {
    return new ApiResult(1, status, message);
  }
  public static LOGIC_ERROR(message: string) {
    return new ApiResult(1, 500, message);
  }
  public static SYS_ERROR(message: string) {
    return new ApiResult(1, 500, message);
  }
  /**
   *
   * @param status 状态码
   * @param message 消息
   * @param data 数据
   */
  public static Error_Filter(status: number, message = "请求成功", data?: any) {
    return new ApiResult(1, status, message, data);
  }
  public static async TRY_CATCH(tryFn: () => Promise<ApiResult>) {
    try {
      return await tryFn();
    } catch (error) {
      return ApiResult.SYS_ERROR(error.message);
    }
  }
}
// Decorator
export const TryCatch = (_target, _name, descriptor) => {
  const fn = descriptor.value;
  descriptor.value = async function (...rest: any) {
    return await ApiResult.TRY_CATCH(async () => {
      return await fn.call(this, ...rest);
    });
  };
  return descriptor;
};
