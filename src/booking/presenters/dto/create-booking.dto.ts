import { IsMilitaryTime, IsString } from 'class-validator';
import { IBooking } from '~/booking/domain/booking';
import { IsAfterStart } from '~/utils/validators/is-after-start.validator';
import { IsValidDate } from '~/utils/validators/is-valid-date.validator';
import { IsYyyyMmDd } from '~/utils/validators/is-yyyy-mm-dd.validator';

export class CreateBookingDto implements Partial<IBooking> {
  @IsString()
  user: string;

  @IsYyyyMmDd()
  @IsValidDate()
  date: string;

  @IsMilitaryTime()
  startTime: string;

  @IsMilitaryTime()
  @IsAfterStart('startTime')
  endTime: string;
}
