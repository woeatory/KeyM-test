export interface IBooking {
  id: string;
  user: string;
  date: string;
  startTime: string;
  endTime: string;
}

export class Booking implements IBooking {
  constructor(
    public id: string,
    public user: string,
    public date: string,
    public startTime: string,
    public endTime: string,
  ) {}
}
