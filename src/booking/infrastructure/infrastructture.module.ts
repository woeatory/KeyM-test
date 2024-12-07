import { DynamicModule, Module } from '@nestjs/common';
import { InMemoryBookingRepository } from './persistence/in-memory/booking.repository';
import { BookingRepository } from './persistence/booking.repository';

function createProvider(driver: 'in-memory' | 'prisma' = 'in-memory') {
  if (driver === 'in-memory') return InMemoryBookingRepository;
}

@Module({})
export class BookingInfrastructureModule {
  static register(driver: 'in-memory' | 'prisma' = 'in-memory'): DynamicModule {
    const provider = createProvider(driver);
    return {
      module: BookingInfrastructureModule,
      providers: [{ provide: BookingRepository, useClass: provider }],
      exports: [BookingRepository],
    };
  }
}
