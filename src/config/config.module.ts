import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(), //cada vez que se importe se creará una nueva instancia
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
