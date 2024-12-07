import { validate } from 'class-validator';
import { IsAfterStart } from '../../src/utils/validators/is-after-start.validator';

class TestClass {
  startTime: string;
  @IsAfterStart('startTime')
  endTime: string;
}

describe('IsAfterStart decorator', () => {
  it('should validate', async () => {
    const instance = new TestClass();
    instance.startTime = '00:00';
    instance.endTime = '00:01';

    const result = await validate(instance);

    expect(result).toHaveLength(0);
  });

  it('should validate', async () => {
    const instance = new TestClass();
    instance.startTime = '00:00';
    instance.endTime = '00:11';

    const result = await validate(instance);

    expect(result).toHaveLength(0);
  });

  it('should validate', async () => {
    const instance = new TestClass();
    instance.startTime = '22:00';
    instance.endTime = '23:59';

    const result = await validate(instance);

    expect(result).toHaveLength(0);
  });

  it('should not validate', async () => {
    const instance = new TestClass();
    instance.startTime = '22:00';
    instance.endTime = '21:59';

    const result = await validate(instance);

    expect(result).toHaveLength(1);
    expect(result[0].constraints).toHaveProperty('isAfterStart');
  });

  it('should not validate', async () => {
    const instance = new TestClass();
    instance.startTime = '00:00';
    instance.endTime = '00:00';

    const result = await validate(instance);

    expect(result).toHaveLength(1);
    expect(result[0].constraints).toHaveProperty('isAfterStart');
  });

  it('should not validate', async () => {
    const instance = new TestClass();
    instance.startTime = '10:00';
    instance.endTime = '00:59';

    const result = await validate(instance);

    expect(result).toHaveLength(1);
    expect(result[0].constraints).toHaveProperty('isAfterStart');
  });
});
