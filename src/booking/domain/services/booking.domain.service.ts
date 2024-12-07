import { Injectable } from '@nestjs/common';
import { Booking } from '../booking';
import { IBookingDomainService } from './booking.domain.service.interface';

@Injectable()
export class BookingDomainService implements IBookingDomainService {
  bookingOverlapping(booking: Booking, others: Booking[]): boolean {
    return others.some(
      (value) =>
        value.date === booking.date &&
        value.id !== booking.id &&
        !(
          booking.endTime <= value.startTime ||
          booking.startTime >= value.endTime
        ),
    );
  }
}
