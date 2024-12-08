import { ApiProperty } from '@nestjs/swagger';
import { IBooking } from '~/booking/domain/booking';

export class BookingDto implements IBooking {
  @ApiProperty({
    description: 'UUID of booking',
    example: '3c8b1804-4845-4781-b9e6-b4de40ff272c',
  })
  id: string;

  @ApiProperty({ description: 'Username', example: 'Jane Doe' })
  user: string;

  @ApiProperty({
    description: 'Date in YYYY-MM-DD format',
    example: '2024-12-12',
  })
  date: string;

  @ApiProperty({ description: 'Time in HH:MM format', example: '10:00' })
  startTime: string;

  @ApiProperty({
    description: 'Time in HH:MM format, should be after startTime',
    example: '11:30',
  })
  endTime: string;
}
