import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { BookingService } from '../application/booking.service';
import { CreateBookingCommand } from '../application/commands/create-booking.command';
import { CreateBookingDto } from './dto/create-booking.dto';
import { GetBookingCommand } from '../application/commands/get-booking.command';
import { DeleteBookingCommand } from '../application/commands/delete-booking.command';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { UpdateBookingCommand } from '../application/commands/update-booking.command';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { BookingDto } from './dto/booking.dto';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The booking has been successfully created.',
    type: BookingDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
    example: 'Date already booked',
  })
  async createBooking(@Body() createBookingDto: CreateBookingDto) {
    try {
      return await this.bookingService.createBooking(
        new CreateBookingCommand({
          user: createBookingDto.user,
          date: createBookingDto.date,
          startTime: createBookingDto.startTime,
          endTime: createBookingDto.endTime,
        }),
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get(':id')
  @ApiFoundResponse({ description: 'Booking was found', type: BookingDto })
  @ApiBadRequestResponse({
    description: 'Bad request',
    example: 'Book not found',
  })
  async getBookingById(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.bookingService.getBooking(new GetBookingCommand(id));
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  @ApiFoundResponse({ description: 'List of all bookings', type: [BookingDto] })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  async getBookings() {
    try {
      return await this.bookingService.getAllBookings();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Booking was deleted' })
  @ApiBadRequestResponse({
    description: 'Bad request',
    example: 'Booking not found',
  })
  async deleteBooking(@Param('id', ParseUUIDPipe) id: string) {
    try {
      await this.bookingService.deleteBooking(new DeleteBookingCommand(id));
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put()
  @ApiOkResponse({ description: 'Booking modified' })
  @ApiBadRequestResponse({
    description: 'Bad request',
    example: 'Booking not found',
  })
  async updateBooking(@Body() updateBookingDto: UpdateBookingDto) {
    try {
      await this.bookingService.updateBooking(
        new UpdateBookingCommand(updateBookingDto.id, {
          user: updateBookingDto.user,
          date: updateBookingDto.date,
          startTime: updateBookingDto.startTime,
          endTime: updateBookingDto.endTime,
        }),
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
