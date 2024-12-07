import { Booking } from '../booking';

export interface IBookingFactory {
  create(
    user: string,
    date: string,
    startTime: string,
    endTime: string,
  ): Booking;
}
