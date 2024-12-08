import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { IBooking } from '~/booking/domain/booking';

export class UpdateBookingDto implements Partial<IBooking> {
  @ApiProperty({
    description: 'UUID of booking',
    example: '3c8b1804-4845-4781-b9e6-b4de40ff272c',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Username',
    required: false,
    example: 'Jane Doe',
  })
  @IsOptional()
  @IsString()
  user?: string;

  @ApiProperty({
    description: 'Date in YYYY-MM-DD format',
    example: '2024-12-12',
    required: false,
  })
  @IsOptional()
  @IsString()
  date?: string;

  @ApiProperty({
    description: 'Time in HH:MM format',
    example: '10:00',
    required: false,
  })
  @IsOptional()
  @IsString()
  startTime?: string;

  @ApiProperty({
    description: 'Time in HH:MM format, should be after startTime',
    example: '11:30',
    required: false,
  })
  @IsOptional()
  @IsString()
  endTime?: string;
}
