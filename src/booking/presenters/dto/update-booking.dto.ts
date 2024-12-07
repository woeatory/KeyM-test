import { IsOptional, IsString, IsUUID } from 'class-validator';
import { IBooking } from '~/booking/domain/booking';

export class UpdateBookingDto implements Partial<IBooking> {
  @IsUUID()
  id: string;

  @IsOptional()
  @IsString()
  user?: string;

  @IsOptional()
  @IsString()
  date?: string;

  @IsOptional()
  @IsString()
  startTime?: string;

  @IsOptional()
  @IsString()
  endTime?: string;
}
