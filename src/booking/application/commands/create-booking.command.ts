import { IBooking } from '~/booking/domain/booking';

export class CreateBookingCommand {
  constructor(public readonly booking: Omit<IBooking, 'id'>) {}
}
