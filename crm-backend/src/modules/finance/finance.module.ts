import { forwardRef, Module } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { FinanceController } from './finance.controller';
import { RentalsModule } from '../rentals/rentals.module';

@Module({
  controllers: [FinanceController],
  providers: [FinanceService],
  exports: [FinanceService],
  imports: [forwardRef(() => RentalsModule)],
})
export class FinanceModule {}
