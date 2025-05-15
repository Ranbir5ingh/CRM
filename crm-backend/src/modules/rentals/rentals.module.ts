import { forwardRef, Module } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { RentalsController } from './rentals.controller';
import { VehiclesModule } from '../vehicle/vehicle.module';
import { FinanceModule } from '../finance/finance.module';

@Module({
  controllers: [RentalsController],
  providers: [RentalsService],
  imports: [VehiclesModule, forwardRef(() => FinanceModule)],
  exports: [RentalsService],
})
export class RentalsModule {}
