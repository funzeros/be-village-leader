import { Body, Controller, Headers, Post } from "@nestjs/common";
import { LoginDTO, RegisterBase } from "local-common-util";
import { ApiResult, TryCatch, database, ValidBody } from "../config";
import { UserService } from "./user.service";
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {
    database.libInit({ libName: "user", tables: [{ name: "user_base" }] });
  }
  @Post("login_register")
  @ValidBody(new LoginDTO())
  @TryCatch
  async loginAndRegistry(@Body() body: LoginDTO): Promise<ApiResult> {
    const userInfo = this.userService.getUserByEmail(body.email);
    if (userInfo)
      return ApiResult.SUCCESS({
        isLogin: true,
        userInfo: this.userService.login(body)
      });
    return ApiResult.SUCCESS(await this.userService.sendMailCode(body));
  }
  @Post("register")
  @TryCatch
  async registery(@Body() body: RegisterBase): Promise<ApiResult> {
    return ApiResult.SUCCESS(this.userService.register(body));
  }
  @Post("token_auth")
  @TryCatch
  async tokenAuth(@Headers() header): Promise<ApiResult> {
    return ApiResult.SUCCESS(this.userService.tokenAuth(header.authorization));
  }
}
