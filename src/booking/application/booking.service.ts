import { Injectable, Logger } from '@nestjs/common';
import { CreateBookingCommand } from './commands/create-booking.command';
import { BookingRepository } from '../infrastructure/persistence/booking.repository';
import { BookingFactory } from '../domain/factories/booking.factory';
import { BookingDomainService } from '../domain/services/booking.domain.service';
import { GetBookingCommand } from './commands/get-booking.command';
import { DeleteBookingCommand } from './commands/delete-booking.command';
import { UpdateBookingCommand } from './commands/update-booking.command';

@Injectable()
export class BookingService {
  private readonly logger: Logger;
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly bookingFactory: BookingFactory,
    private readonly bookingDomainService: BookingDomainService,
  ) {
    this.logger = new Logger(BookingService.name);
  }

  async createBooking(createBookingCommand: CreateBookingCommand) {
    const booking = this.bookingFactory.create(
      createBookingCommand.booking.user,
      createBookingCommand.booking.date,
      createBookingCommand.booking.startTime,
      createBookingCommand.booking.endTime,
    );

    const overlaps = await this.bookingRepository
      .findAll()
      .then((bookings) =>
        this.bookingDomainService.bookingOverlapping(booking, bookings),
      );

    if (overlaps) {
      throw new Error('This date is already booked');
    }

    return this.bookingRepository.create(booking).then((result) => {
      this.logger.log(`Created booking ${JSON.stringify(result)}`);
      return result;
    });
  }

  async getBooking(getBookingCommand: GetBookingCommand) {
    const booking = await this.bookingRepository.find(getBookingCommand.id);
    this.logger.log(`Get booking: ${JSON.stringify(booking)}`);
    return booking;
  }

  async getAllBookings() {
    return await this.bookingRepository.findAll();
  }

  async deleteBooking(deleteBookingCommand: DeleteBookingCommand) {
    try {
      this.logger.log(`Deleting booking ${deleteBookingCommand.id}`);
      return await this.bookingRepository.delete(deleteBookingCommand.id);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async updateBooking(updateBookingCommand: UpdateBookingCommand) {
    try {
      this.logger.log(`Updating booking: ${updateBookingCommand.id}`);
      const booking = await this.bookingRepository.find(
        updateBookingCommand.id,
      );
      booking.user = updateBookingCommand.booking.user
        ? updateBookingCommand.booking.user
        : booking.user;

      booking.date = updateBookingCommand.booking.date
        ? updateBookingCommand.booking.date
        : booking.date;

      booking.startTime = updateBookingCommand.booking.startTime
        ? updateBookingCommand.booking.startTime
        : booking.startTime;

      booking.endTime = updateBookingCommand.booking.endTime
        ? updateBookingCommand.booking.endTime
        : booking.endTime;

      const overlaps = await this.bookingRepository
        .findAll()
        .then((bookings) =>
          this.bookingDomainService.bookingOverlapping(booking, bookings),
        );

      if (overlaps) {
        throw new Error('This date is already booked');
      }
      await this.bookingRepository.update(booking);
      this.logger.log(`Booking updated: ${booking}`);
      return booking;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
