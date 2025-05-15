import { Module } from '@nestjs/common';
import { RentalsModule } from '../rentals/rentals.module';
import { CustomersModule } from '../customers/customers.module';
import { VehiclesModule } from '../vehicle/vehicle.module';
import { DashboardController } from './dashnoard.controller';
import { FinanceModule } from '../finance/finance.module';

@Module({
  imports: [RentalsModule, CustomersModule, VehiclesModule, FinanceModule],
  controllers: [DashboardController],
  providers: [],
  exports: [],
})
export class DashboardModule {}
