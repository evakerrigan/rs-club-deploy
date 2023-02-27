import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
@Controller()
export class AppController {
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
