import { Controller, Get, UseGuards } from '@nestjs/common';
import { RentalsService } from '../rentals/rentals.service';
import { CustomersService } from '../customers/customers.service';
import { VehiclesService } from '../vehicle/vehicle.service';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Adminguard } from 'src/services/supabase/supabase.guards';
import { FinanceService } from '../finance/finance.service';
import { NotificationService } from 'src/services/notifications/notification.service';

@ApiBearerAuth()
@ApiTags('Dashboard Module')
@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly rentalService: RentalsService,
    private readonly customerService: CustomersService,
    private readonly vehicleService: VehiclesService,
    private readonly financeService: FinanceService,
    private readonly notificationService: NotificationService,
  ) {}
  @ApiProperty({ description: 'for fetching dashboard data' })
  @Get('data')
  @UseGuards(Adminguard)
  async getDashboardData() {
    const recentRental = await this.rentalService.getRecentRentals();
    const activeCustomerCount = await this.customerService.getActiveCustomers();
    const statsData = await this.financeService.getStatsData();
    const notification = await this.notificationService.getNotifications();
    const vehicleStatusCount =
      await this.vehicleService.getVehiclesCountsByStatus();

    return {
      recentRental,
      activeCustomerCount,
      statsData,
      vehicleStatusCount,
      notification,
    };
  }
}
