import { DynamicModule, Module } from '@nestjs/common';
import { InMemoryBookingRepository } from './persistence/in-memory/booking.repository';
import { BookingRepository } from './persistence/booking.repository';
import { MongoBookingRepository } from './persistence/mongo-db/booking.repository';
import { PrismaModule } from '~/prisma/prisma.module';

function buildModule(
  driver: 'in-memory' | 'prisma' = 'in-memory',
): DynamicModule {
  if (driver === 'in-memory') {
    return {
      module: BookingInfrastructureModule,
      providers: [
        { provide: BookingRepository, useClass: InMemoryBookingRepository },
      ],
      exports: [BookingRepository],
    };
  } else if (driver === 'prisma') {
    return {
      imports: [PrismaModule],
      module: BookingInfrastructureModule,
      providers: [
        { provide: BookingRepository, useClass: MongoBookingRepository },
      ],
      exports: [BookingRepository],
    };
  }
}

@Module({})
export class BookingInfrastructureModule {
  static register(driver: 'in-memory' | 'prisma' = 'in-memory'): DynamicModule {
    const module = buildModule(driver);
    return module;
  }
}
