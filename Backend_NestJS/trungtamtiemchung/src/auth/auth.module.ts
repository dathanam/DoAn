import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from 'src/prisma/prima.service';


@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: 60 * 60 }
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, PrismaService],
  exports: [AuthService]
})
export class AuthModule {}
