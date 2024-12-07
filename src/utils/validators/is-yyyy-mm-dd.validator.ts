import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsYyyyMmDd(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isYyyyMmDd',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string) {
          const regex = /^\d{4}-\d{2}-\d{2}$/;
          return !!value.match(regex);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid date string in format YYYY-MM-DD`;
        },
      },
    });
  };
}
