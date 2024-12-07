import { validate } from 'class-validator';
import { IsYyyyMmDd } from '../../src/utils/validators/is-yyyy-mm-dd.validator';

class TestClass {
  @IsYyyyMmDd()
  date: string;
}

describe('IsYyyyMmDd decorator', () => {
  it('should validate', async () => {
    const instance = new TestClass();
    instance.date = '1970-01-01';

    const result = await validate(instance);

    expect(result).toHaveLength(0);
  });

  it('should not validate', async () => {
    const instance = new TestClass();
    instance.date = '1970.01.01';

    const result = await validate(instance);

    expect(result).toHaveLength(1);
    expect(result[0].constraints).toHaveProperty('isYyyyMmDd');
  });

  it('should not validate', async () => {
    const instance = new TestClass();
    instance.date = '1970-01.01';

    const result = await validate(instance);

    expect(result).toHaveLength(1);
    expect(result[0].constraints).toHaveProperty('isYyyyMmDd');
  });

  it('should not validate', async () => {
    const instance = new TestClass();
    instance.date = '';

    const result = await validate(instance);

    expect(result).toHaveLength(1);
    expect(result[0].constraints).toHaveProperty('isYyyyMmDd');
  });
});
