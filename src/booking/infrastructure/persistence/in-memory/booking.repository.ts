import { Injectable } from '@nestjs/common';
import { BookingRepository } from '../booking.repository';
import { Booking } from '~/booking/domain/booking';

@Injectable()
export class InMemoryBookingRepository implements BookingRepository {
  private readonly storage = new Map<string, Booking>();

  create(booking: Booking): Promise<Booking> {
    this.storage.set(booking.id, booking);
    return Promise.resolve(booking);
  }

  find(id: string): Promise<Booking> {
    return new Promise<Booking>((resolve, reject) => {
      const result = this.storage.get(id);
      if (result) resolve(result);
      reject(new Error('Booking not found'));
    });
  }

  findAll(): Promise<Booking[]> {
    const result: Booking[] = [];
    this.storage.forEach((booking) => result.push(booking));
    return Promise.resolve(result);
  }

  delete(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const result = this.storage.delete(id);
      if (result) resolve(result);
      reject(new Error('Booking not found'));
    });
  }

  update(booking: Booking): Promise<string> {
    this.storage.set(booking.id, booking);
    return Promise.resolve(booking.id);
  }
}
