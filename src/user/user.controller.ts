import {
  Body,
  Controller,
  Get,
  Patch,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { BearerTokenGuard } from "../auth/bearer-token.guard";
import { ApiBearerTokenHeader } from "../core/decorator/api-bearer-token-header";
import { UserService } from "./user.service";

@ApiTags("user")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(BearerTokenGuard)
  @Get("me")
  @ApiOperation({
    summary: "토큰을 기준으로 현재 사용자 정보를 가져옵니다.",
  })
  @ApiOkResponse({
    description: "사용자 가져오기 성공",
  })
  @ApiBearerTokenHeader()
  async getMe(@Req() req) {
    return this.userService.findUserById(req.user.userId);
  }

  @UseGuards(BearerTokenGuard)
  @Patch("me")
  @ApiOperation({
    summary: "토큰을 기준으로 현재 사용자 정보를 수정합니다.",
  })
  @ApiOkResponse({
    description: "사용자 정보 수정 성공",
  })
  @ApiBearerTokenHeader()
  async updateUserInfo(@Req() req, @Body() body) {
    return this.userService.updateUserInfo(req.user.userId, body);
  }

  @UseGuards(BearerTokenGuard)
  @Get("search")
  @ApiOperation({
    summary: "유저 정보 검색",
  })
  @ApiOkResponse({
    description: "유저 정보 검색 성공",
  })
  @ApiBearerTokenHeader()
  async searchUser(@Query("email") email: string, @Query("name") name: string) {
    return this.userService.searchUser(email, name);
  }
}
