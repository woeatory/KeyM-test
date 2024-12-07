import { Module } from '@nestjs/common';
import { BookingController } from '../presenters/booking.controller';
import { BookingService } from './booking.service';
import { BookingFactory } from '../domain/factories/booking.factory';
import { BookingInfrastructureModule } from '../infrastructure/infrastructture.module';
import { BookingDomainService } from '../domain/services/booking.domain.service';

@Module({
  controllers: [BookingController],
  providers: [BookingService, BookingFactory, BookingDomainService],
  imports: [BookingInfrastructureModule.register('in-memory')],
})
export class BookingModule {}
