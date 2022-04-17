import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prima.service';
import { AuthModule } from './auth/auth.module';
import { PhotosController } from './photos/photos.controller';
import { PhotosModule } from './photos/photos.module';
import { AppGateway } from './app.gateway';

@Module({
  imports: [AuthModule, PhotosModule],
  controllers: [AppController, PhotosController],
  providers: [PrismaService, AppService, AppGateway],
})
export class AppModule {}
