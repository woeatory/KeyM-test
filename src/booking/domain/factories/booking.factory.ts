import { Injectable } from '@nestjs/common';
import { Booking } from '../booking';
import { randomUUID } from 'crypto';
import { IBookingFactory } from './booking.factory.interface';

@Injectable()
export class BookingFactory implements IBookingFactory {
  create(
    user: string,
    date: string,
    startTime: string,
    endTime: string,
  ): Booking {
    const id = randomUUID();
    return new Booking(id, user, date, startTime, endTime);
  }
}
