import { Booking } from '~/booking/domain/booking';

export abstract class BookingRepository {
  abstract create(booking: Booking): Promise<Booking>;
  abstract find(id: string): Promise<Booking>;
  abstract findAll(): Promise<Booking[]>;
  abstract delete(id: string): Promise<boolean>;
  abstract update(booking: Booking): Promise<string>;
}
