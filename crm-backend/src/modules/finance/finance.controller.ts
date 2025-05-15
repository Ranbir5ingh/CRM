import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { ApiBearerAuth, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { EmployeeGuard } from 'src/services/supabase/supabase.guards';
import { RentalsService } from '../rentals/rentals.service';
import { TransactionBodyDto } from './finance.dto';

@ApiTags('Finance Module')
@Controller('finance')
@ApiBearerAuth()
export class FinanceController {
  constructor(
    private readonly financeService: FinanceService,
    private readonly rentalService: RentalsService,
  ) {}
  @Get('/transactions/all')
  @ApiQuery({ name: 'page', type: Number })
  @ApiQuery({ name: 'pageSize', type: Number })
  @ApiQuery({ name: 'searchValue', type: String, required: false })
  @UseGuards(EmployeeGuard)
  async getAllTransactions(
    @Query() query: { page: number; pageSize: number; searchValue: string },
  ) {
    return await this.financeService.getAllTransactios(
      query.page,
      query.pageSize,
      query.searchValue,
    );
  }
  @ApiProperty({ description: 'for Fetching stats data' })
  @Get('/statistics')
  @UseGuards(EmployeeGuard)
  async getStats() {
    const graphData = await this.financeService.getStatsData();
    const activeRentals = await this.rentalService.getActiveRentals();
    return { graphData, activeRentals };
  }
  @ApiProperty({ description: 'for Fetching stats data' })
  @Post('/add-expense')
  @UseGuards(EmployeeGuard)
  async addExpense(@Body() body: TransactionBodyDto) {
    return await this.financeService.createTransaction(body);
  }
}
