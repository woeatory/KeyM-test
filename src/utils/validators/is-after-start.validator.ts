import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { MINUTES_IN_HOUR } from '../time';

export function IsAfterStart(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isAfterStart',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(endTime: string, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const startTime: string = (args.object as any)[relatedPropertyName];

          const [startHours, startMinutes] = startTime.split(':').map(Number);
          const [endHours, endMinutes] = endTime.split(':').map(Number);
          const startInMinutes = startHours * MINUTES_IN_HOUR + startMinutes;
          const endInMinutes = endHours * MINUTES_IN_HOUR + endMinutes;

          return endInMinutes > startInMinutes;
        },
        defaultMessage() {
          return `endTime must be later than start time`;
        },
      },
    });
  };
}
