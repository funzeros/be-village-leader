import { Body, Controller, Get, Post } from "@nestjs/common";
import { LoginBase } from "local-common-util";
import { ApiResult, TryCatch, database, ValidBody } from "../config";
import { UserService } from "./user.service";
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {
    database.libInit({ libName: "user", tables: [{ name: "user_base" }] });
  }
  @Get("get_user")
  getUser(): ApiResult {
    return ApiResult.SUCCESS(this.userService.getUser());
  }
  @Post("login_register")
  @ValidBody(new LoginBase())
  @TryCatch
  async loginAndRegistry(@Body() body: LoginBase): Promise<ApiResult> {
    const userInfo = this.userService.getUserByEmail(body.email);

    if (userInfo) return ApiResult.SUCCESS(this.userService.login(body));
    return ApiResult.SUCCESS(await this.userService.register(body));
  }
}
