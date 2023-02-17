import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github';
import { ExtractJwt, Strategy as PassportJwtStrategy } from 'passport-jwt';

//запрос на гитхаб, авторизация на гитхабе и возвращение данных с гитхаба
@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('GITHUB_CLIENT_ID'),
      clientSecret: configService.get<string>('GITHUB_CLIENT_SECRET'),
      callbackURL: 'http://localhost:8000/api/auth/callback',
      scope: ['public_profile'],
    });
  }

  async validate(accessToken: string, _refreshToken: string, profile: Profile) {
    return profile;
  }
}

//проверка токена локальная, авторизован ли пользователь
@Injectable()
export class JwtStrategy extends PassportStrategy(PassportJwtStrategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //извлечение токена из запроса
      ignoreExpiration: false, //отклонять запросы если токен истек по сроку
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    console.log(
      'auth.STRATEGY.ts файл - username: payload.username',
      payload.username,
    );
    return { id: payload.sub, username: payload.username };
  }
}
