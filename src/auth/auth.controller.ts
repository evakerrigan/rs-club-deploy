import { Controller, Get, Req, Response, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../guards/auth.guard';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  @Get('validate')
  @UseGuards(JwtAuthGuard)
  async valideToken() {
    return { statusCode: 200, message: 'Authorized' };
  }

  @Get()
  @UseGuards(AuthGuard('github'))
  async login() {
    //
  }

  @Get('callback')
  @UseGuards(AuthGuard('github'))
  async authCallback(@Req() req, @Response() res) {
    const user = req.user;
    const githubName: string = user.username;
    const avatarUrl = user.photos[0].value;
    const findUser = await this.usersService.findByCond({ githubName });
    let id;
    if (!findUser) {
      id = await this.usersService.create({
        githubName,
        profilePicture: avatarUrl,
      });
    }
    const payload = { sub: user.id, username: user.username };
    const rsAccessToken = this.jwtService.sign(payload);
    /* 
      ищу юзера в бд, если нет, то создаем, а если есть, обновляю токен
    */
    const userID = id ? String(id).valueOf() : String(findUser?._id).valueOf();

    res.cookie('rsAccessToken', rsAccessToken, {
      expires: new Date(new Date().getTime() + 86400 * 1000),
      sameSite: 'strict',
      httpOnly: false,
    });
    res.cookie('userName', githubName, {
      expires: new Date(new Date().getTime() + 86400 * 1000),
    });
    res.cookie('userId', userID, {
      expires: new Date(new Date().getTime() + 86400 * 1000),
    });

    res.redirect(302, `/`);
  }
}
