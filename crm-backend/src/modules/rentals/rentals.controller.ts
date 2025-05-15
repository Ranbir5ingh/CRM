import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { ApiBearerAuth, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { EmployeeGuard } from 'src/services/supabase/supabase.guards';
import {
  CreateRentalDto,
  RentalIdDto,
  rentalStatus,
  RentalStatusdDto,
} from './rentals.dto';
import { VehiclesService } from '../vehicle/vehicle.service';
import { FinanceService } from '../finance/finance.service';
import { transactionType } from '../finance/finance.dto';

@ApiTags('Rentals')
@Controller('rentals')
@ApiBearerAuth()
export class RentalsController {
  constructor(
    private readonly rentalsService: RentalsService,
    private readonly vehicleService: VehiclesService,
    private readonly financeService: FinanceService,
  ) {}

  @Post('/create')
  @ApiProperty({ description: 'for creating the rentals' })
  @UseGuards(EmployeeGuard)
  async createRental(@Body() data: CreateRentalDto) {
    const rental = await this.rentalsService.createRental(data);
    const { advance } = data;
    if (rental) {
      await this.vehicleService.changeVehicleStatus(data.vehicleId, 'RENTAL');
      if (advance && advance > 0) {
        await this.financeService.createTransaction({
          description: `Rental advance for ${data.title}`,
          rentalId: rental.id,
          amount: advance,
          type: transactionType.INCOME,
        });
      }
    }
    return rental;
  }
  @Put('/update')
  @ApiProperty({ description: 'for updating the rentals' })
  @UseGuards(EmployeeGuard)
  async updateRental(
    @Query() query: RentalIdDto,
    @Body() data: CreateRentalDto,
  ) {
    return await this.rentalsService.updateRental(query.rentalId, data);
  }
  @Get('/all')
  @ApiQuery({ name: 'page', type: Number })
  @ApiQuery({ name: 'pageSize', type: Number })
  @ApiQuery({ name: 'searchValue', type: String, required: false })
  @UseGuards(EmployeeGuard)
  async getAllRental(
    @Query() query: { page: number; pageSize: number; searchValue: string },
  ) {
    return await this.rentalsService.getAllRentals(
      query.page,
      query.pageSize,
      query.searchValue,
    );
  }
  @Get('/get-rental')
  @ApiProperty({ description: 'for creating the rentals' })
  @UseGuards(EmployeeGuard)
  async getRentalById(@Query() query: RentalIdDto) {
    return await this.rentalsService.getRentalById(query.rentalId);
  }

  @Patch('/change-status')
  @ApiProperty({ description: 'for changing the rental status' })
  @UseGuards(EmployeeGuard)
  async changeRentalStatus(
    @Query() query: { rentalId: string },
    @Body() body: RentalStatusdDto,
  ) {
    const { status } = body;

    const res = await this.rentalsService.updateRentalStatus(
      query.rentalId,
      status,
    );

    if (res) {
      if ((status as rentalStatus) != rentalStatus.INPROGRESS) {
        await this.vehicleService.changeVehicleStatus(
          res.vehicleId,
          'AVAILABLE',
        );
      }
      console.log('after stats change');
      if ((status as rentalStatus) == rentalStatus.COMPLETED) {
        await this.financeService.createTransaction({
          description: `Due payment for Rental  ${res.title}`,
          rentalId: res.id,
          amount: res.totalAmount - res.advance,
          type: transactionType.INCOME,
        });
      }
      if (
        (status as rentalStatus) == rentalStatus.CANCELLED ||
        (status as rentalStatus) == rentalStatus.DELETED
      ) {
        await this.financeService.deleteTransactionsByRentalId(res.id);
      }
    }

    return res;
  }
}
