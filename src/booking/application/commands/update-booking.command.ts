import { IBooking } from '~/booking/domain/booking';

export class UpdateBookingCommand {
  constructor(
    public readonly id: string,
    public readonly booking: Partial<Omit<IBooking, 'id'>>,
  ) {}
}
