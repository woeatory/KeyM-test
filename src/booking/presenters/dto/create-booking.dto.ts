import { ApiProperty } from '@nestjs/swagger';
import { IsMilitaryTime, IsString } from 'class-validator';
import { IBooking } from '~/booking/domain/booking';
import { IsAfterStart } from '~/utils/validators/is-after-start.validator';
import { IsValidDate } from '~/utils/validators/is-valid-date.validator';
import { IsYyyyMmDd } from '~/utils/validators/is-yyyy-mm-dd.validator';

export class CreateBookingDto implements Partial<IBooking> {
  @ApiProperty({ description: 'Username', example: 'Jane Doe' })
  @IsString()
  user: string;

  @ApiProperty({
    description: 'Date in YYYY-MM-DD format',
    example: '2024-12-12',
  })
  @IsYyyyMmDd()
  @IsValidDate()
  date: string;

  @ApiProperty({ description: 'Time in HH:MM format', example: '10:00' })
  @IsMilitaryTime()
  startTime: string;

  @ApiProperty({
    description: 'Time in HH:MM format, should be after startTime',
    example: '11:30',
  })
  @IsMilitaryTime()
  @IsAfterStart('startTime')
  endTime: string;
}
