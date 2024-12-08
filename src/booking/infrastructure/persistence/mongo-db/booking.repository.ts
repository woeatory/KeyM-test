import { Injectable, Logger } from '@nestjs/common';
import { BookingRepository } from '../booking.repository';
import { Booking } from '~/booking/domain/booking';
import { PrismaService } from '~/prisma/prisma.service';

@Injectable()
export class MongoBookingRepository implements BookingRepository {
  logger: Logger;
  constructor(private readonly prismaService: PrismaService) {
    this.logger = new Logger(MongoBookingRepository.name);
  }

  async create(booking: Booking): Promise<Booking> {
    return await this.prismaService.booking.create({
      data: {
        id: booking.id,
        user: booking.user,
        date: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime,
      },
    });
  }

  async find(id: string): Promise<Booking> {
    return await this.prismaService.booking.findFirst({ where: { id } });
  }

  async findAll(): Promise<Booking[]> {
    return await this.prismaService.booking.findMany();
  }
  async delete(id: string): Promise<boolean> {
    try {
      await this.prismaService.booking.delete({ where: { id } });
      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  async update(booking: Booking): Promise<string> {
    try {
      const { id, ...data } = booking;
      await this.prismaService.booking.update({
        where: { id },
        data,
        select: { id: true },
      });
      return id;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
