import { Controller, Get, Req, Response, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('github'))
  async login() {
    //
  }

  @Get('callback')
  @UseGuards(AuthGuard('github'))
  async authCallback(@Req() req, @Response() res) {
    const user = req.user;
    const userId = user.id;
    const userName = user.username;
    // const avatarUrl = user.user._json.avatar_url;
    const payload = { sub: user.id, username: user.username };
    const rsAccessToken = this.jwtService.sign(payload);
    // console.log('user', user);
    console.log('userId =', userId);
    console.log('userName =', userName);
    // console.log('avatarUrl =', avatarUrl);
    console.log('rsAccessToken =', rsAccessToken);

    res.cookie('rsAccessToken', rsAccessToken, {
      expires: new Date(new Date().getTime() + 300 * 1000),
      sameSite: 'strict',
      httpOnly: true,
    });
    res.cookie('userName', userName, {
      expires: new Date(new Date().getTime() + 300 * 1000),
    });

    const host = this.configService.get<string>('SELF_HOST');

    res.redirect(302, `/`);
  }
}
