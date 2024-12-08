import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { BookingModule } from './booking/application/booking.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [configuration],
      cache: true,
    }),
    BookingModule,
  ],
})
export class AppModule {}
