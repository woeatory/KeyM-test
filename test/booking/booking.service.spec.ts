import { Test } from '@nestjs/testing';
import { BookingService } from '../../src/booking/application/booking.service';
import { BookingRepository } from '../../src/booking/infrastructure/persistence/booking.repository';
import { BookingDomainService } from '../../src/booking/domain/services/booking.domain.service';
import { BookingFactory } from '../../src/booking/domain/factories/booking.factory';
import { Booking } from '../../src/booking/domain/booking';
import { bookingFactoryMock } from './mocks/booking.factory.mock';
import { CreateBookingCommand } from '../../src/booking/application/commands/create-booking.command';
import { IBookingDomainService } from '../../src/booking/domain/services/booking.domain.service.interface';
import { IBookingFactory } from '../../src/booking/domain/factories/booking.factory.interface';
import { bookingRepositoryMock } from './mocks/booking.repository.mock';
import { bookingDomainServiceMock } from './mocks/booking.domain.service.mock';
import { GetBookingCommand } from '../../src/booking/application/commands/get-booking.command';
import { DeleteBookingCommand } from '../../src/booking/application/commands/delete-booking.command';
import { UpdateBookingCommand } from '../../src/booking/application/commands/update-booking.command';

describe('BookingService', () => {
  let service: BookingService;
  let domainServiceMock: jest.Mocked<IBookingDomainService>;
  let repositoryMock: jest.Mocked<BookingRepository>;
  let factoryMock: jest.Mocked<IBookingFactory>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        BookingService,
        {
          provide: BookingRepository,
          useValue: bookingRepositoryMock,
        },
        {
          provide: BookingFactory,
          useValue: bookingFactoryMock,
        },
        {
          provide: BookingDomainService,
          useValue: bookingDomainServiceMock,
        },
      ],
    }).compile();

    service = await moduleRef.get(BookingService);
    domainServiceMock = (await moduleRef.get(
      BookingDomainService,
    )) as jest.Mocked<IBookingDomainService>;
    factoryMock = (await moduleRef.get(
      BookingFactory,
    )) as jest.Mocked<IBookingFactory>;
    repositoryMock = (await moduleRef.get(
      BookingRepository,
    )) as jest.Mocked<BookingRepository>;
  });

  describe('createBooking', () => {
    it('should return created booking', async () => {
      const booking = new Booking(
        '0',
        'Jane Doe',
        '2022-12-12',
        '10:00',
        '10:30',
      );
      factoryMock.create.mockReturnValue(booking);
      domainServiceMock.bookingOverlapping.mockReturnValue(false);
      repositoryMock.findAll.mockResolvedValue([]);
      repositoryMock.create.mockResolvedValue(booking);
      const actual = await service.createBooking(
        new CreateBookingCommand({
          user: 'Jane Doe',
          date: '2022-12-12',
          startTime: '10:00',
          endTime: '10:30',
        }),
      );

      expect(actual).toBeInstanceOf(Booking);
      expect(actual).toMatchObject(booking);
    });

    it('should throw because of overlapping', async () => {
      const booking = new Booking(
        '0',
        'Jane Doe',
        '2022-12-12',
        '10:00',
        '10:30',
      );

      domainServiceMock.bookingOverlapping.mockReturnValue(true);
      repositoryMock.findAll.mockResolvedValue([booking]);
      factoryMock.create.mockReturnValue(booking);

      await expect(
        service.createBooking(
          new CreateBookingCommand({
            user: 'Jane Doe',
            date: '2022-12-12',
            startTime: '10:00',
            endTime: '10:30',
          }),
        ),
      ).rejects.toThrow('This date is already booked');
    });
  });

  describe('getAllBookings', () => {
    it('should return all bookings', async () => {
      const bookings = [
        new Booking('0', 'Jane Doe', '2022-12-12', '10:00', '10:30'),
        new Booking('1', 'Jane Doe', '2022-12-12', '11:00', '11:30'),
      ];

      repositoryMock.findAll.mockResolvedValue(bookings);
      const actual = await service.getAllBookings();

      expect(actual).toMatchObject(bookings);
    });
  });

  describe('getBooking', () => {
    it('should return booking by id', async () => {
      const booking = new Booking(
        '0',
        'Jane Doe',
        '2022-12-12',
        '10:00',
        '10:30',
      );
      repositoryMock.find.mockResolvedValue(booking);

      const actual = await service.getBooking(new GetBookingCommand('0'));

      expect(actual).toBeInstanceOf(Booking);
      expect(actual).toMatchObject(booking);
    });

    it('should throw error if not found', async () => {
      repositoryMock.find.mockRejectedValue(new Error('Booking not found'));

      await expect(
        service.getBooking(new GetBookingCommand('0')),
      ).rejects.toThrow('Booking not found');
    });
  });

  describe('deleteBooking', () => {
    it('should return if deleted', async () => {
      repositoryMock.delete.mockResolvedValue(true);

      await expect(service.deleteBooking(new DeleteBookingCommand('0')))
        .resolves.toBeUndefined;
    });

    it('should reject error', async () => {
      repositoryMock.delete.mockRejectedValue(new Error('Booking not found'));

      await expect(
        service.deleteBooking(new DeleteBookingCommand('0')),
      ).rejects.toThrow('Booking not found');
    });
  });
  describe('updateBooking', () => {
    it('shoule return updated booking', async () => {
      const booking = new Booking(
        '0',
        'Jane Doe',
        '2024-12-12',
        '10:30',
        '11:30',
      );
      repositoryMock.find.mockResolvedValue(booking);
      repositoryMock.findAll.mockResolvedValue([booking]);
      domainServiceMock.bookingOverlapping.mockReturnValue(false);

      const actual = await service.updateBooking(
        new UpdateBookingCommand('0', { user: 'Jone Doe', date: '2024-12-13' }),
      );

      expect(actual).toMatchObject({
        id: '0',
        user: 'Jone Doe',
        date: '2024-12-13',
        startTime: '10:30',
        endTime: '11:30',
      });
    });

    it('should throw if new date overlaps', async () => {
      const bookings = [
        new Booking('0', 'Jane Doe', '2024-12-12', '10:00', '11:00'),
        new Booking('1', 'Jone Doe', '2024-12-12', '12:00', '13:00'),
      ];

      repositoryMock.find.mockResolvedValue(bookings[0]);
      repositoryMock.findAll.mockResolvedValue(bookings);
      domainServiceMock.bookingOverlapping.mockReturnValue(true);

      await expect(
        service.updateBooking(
          new UpdateBookingCommand('1', { startTime: '10:30' }),
        ),
      ).rejects.toThrow('This date is already booked');
    });
  });
});
