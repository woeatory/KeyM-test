import { Booking } from '../../../src/booking/domain/booking';
import { IBookingFactory } from '../../../src/booking/domain/factories/booking.factory.interface';

export class BookingFactoryMock implements IBookingFactory {
  public id = '0';
  create(
    user: string,
    date: string,
    startTime: string,
    endTime: string,
  ): Booking {
    return new Booking(this.id, user, date, startTime, endTime);
  }

  setId(id: string) {
    this.id = id;
  }
}

export const bookingFactoryMock = {
  create: jest.fn(),
};
