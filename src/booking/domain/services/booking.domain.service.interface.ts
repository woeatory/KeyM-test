import { Booking } from '../booking';

export interface IBookingDomainService {
  bookingOverlapping(booking: Booking, others: Booking[]): boolean;
}
