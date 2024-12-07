import { validate } from 'class-validator';
import { IsValidDate } from '../../src/utils/validators/is-valid-date.validator';

class TestClass {
  @IsValidDate()
  date: string;
}

describe('IsValidDate decorator', () => {
  it('should validate', async () => {
    const instance = new TestClass();
    instance.date = '1970-01-01';

    const result = await validate(instance);

    expect(result).toHaveLength(0);
  });

  it('should not validate', async () => {
    const instance = new TestClass();
    instance.date = '1970-00-01';

    const result = await validate(instance);

    expect(result).toHaveLength(1);
    expect(result[0].constraints).toHaveProperty('isValidDate');
  });

  it('should not validate', async () => {
    const instance = new TestClass();
    instance.date = '1970-13-01';

    const result = await validate(instance);

    expect(result).toHaveLength(1);
    expect(result[0].constraints).toHaveProperty('isValidDate');
  });

  it('should not validate', async () => {
    const instance = new TestClass();
    instance.date = '1970-01-00';

    const result = await validate(instance);

    expect(result).toHaveLength(1);
    expect(result[0].constraints).toHaveProperty('isValidDate');
  });

  it('should not validate', async () => {
    const instance = new TestClass();
    instance.date = '1970-01-32';

    const result = await validate(instance);
    expect(result).toHaveLength(1);
    expect(result[0].constraints).toHaveProperty('isValidDate');
  });
});
