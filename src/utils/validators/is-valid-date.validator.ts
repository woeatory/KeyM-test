import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { MAX_DAYS_IN_MONTH, MAX_MONTHS } from '../date';

export function IsValidDate(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isValidDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string) {
          const [, month, day] = value.split('-').map(Number);
          return (
            month >= 1 &&
            month <= MAX_MONTHS &&
            day >= 1 &&
            day <= MAX_DAYS_IN_MONTH
          );
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid date string`;
        },
      },
    });
  };
}
