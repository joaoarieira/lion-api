import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeorm } from './config/config.typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigRegisterModule {}
