import { BookingDomainService } from '../../src/booking/domain/services/booking.domain.service';
import { Booking } from '../../src/booking/domain/booking';
import { BookingFactoryMock } from './mocks/booking.factory.mock';

describe('BookingDomainService', () => {
  let idCounter = 0;

  const bookingFactory = new BookingFactoryMock();

  const existingList = (): Booking[] => {
    const bookings = [];
    bookings.push(
      new Booking('1', 'Jane Doe', '2024-12-12', '10:00', '13:00'),
      new Booking('2', 'Jane Doe', '2024-12-12', '15:30', '16:00'),
      new Booking('3', 'Jane Doe', '2024-12-12', '18:30', '20:00'),
      new Booking('4', 'Jane Doe', '2025-12-12', '18:30', '20:00'),
      new Booking('5', 'Jane Doe', '2024-11-12', '18:30', '20:00'),
      new Booking('6', 'Jane Doe', '2024-12-31', '18:30', '20:00'),
      new Booking('7', 'Jane Doe', '2025-11-31', '18:30', '20:00'),
    );
    return bookings;
  };

  describe('bookingOverlapping', () => {
    beforeEach(() => {
      idCounter = 0;
      bookingFactory.setId(idCounter.toString());
    });

    it('should return true', () => {
      const booking = bookingFactory.create(
        'Jane Doe',
        '2024-12-12',
        '12:30',
        '13:00',
      );
      const existing: Booking[] = existingList();
      const service = new BookingDomainService();

      const actual = service.bookingOverlapping(booking, existing);

      expect(actual).toBeTruthy();
    });

    it('should return true', () => {
      const booking = bookingFactory.create(
        'Jane Doe',
        '2024-12-12',
        '09:00',
        '10:01',
      );
      const existing: Booking[] = existingList();
      const service = new BookingDomainService();

      const actual = service.bookingOverlapping(booking, existing);

      expect(actual).toBeTruthy();
    });

    it('should return true', () => {
      const booking = bookingFactory.create(
        'Jane Doe',
        '2024-12-12',
        '13:00',
        '15:31',
      );
      const existing: Booking[] = existingList();
      const service = new BookingDomainService();

      const actual = service.bookingOverlapping(booking, existing);

      expect(actual).toBeTruthy();
    });

    it('should return false', () => {
      const booking = bookingFactory.create(
        'Jane Doe',
        '2026-12-12',
        '12:30',
        '13:00',
      );
      const existing: Booking[] = existingList();
      const service = new BookingDomainService();

      const actual = service.bookingOverlapping(booking, existing);

      expect(actual).toBeFalsy();
    });
  });
});
