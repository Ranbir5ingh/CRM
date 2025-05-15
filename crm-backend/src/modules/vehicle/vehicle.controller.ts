import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { VehiclesService } from './vehicle.service';
import { ApiBearerAuth, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  VehicleIdDto,
  CreateVehicleDto,
  VerifyVehicleDto,
  VehicleSearchDto,
} from './vehicle.dto';
import {
  EmployeeGuard,
  ManagerGuard,
} from 'src/services/supabase/supabase.guards';

@ApiTags('vehicles')
@Controller('vehicles')
@ApiBearerAuth()
export class VehiclesController {
  constructor(private readonly vehicleService: VehiclesService) {}

  @Get('/all')
  @ApiQuery({ name: 'page', type: Number })
  @ApiQuery({ name: 'pageSize', type: Number })
  @ApiQuery({ name: 'searchValue', type: String, required: false })
  @UseGuards(EmployeeGuard)
  async getAllVehicle(
    @Query() query: { page: number; pageSize: number; searchValue: string },
  ) {
    return await this.vehicleService.getAllVehicle(
      query.page,
      query.pageSize,
      query.searchValue,
    );
  }
  @Get('/get-vehicle')
  @ApiProperty({ description: 'for getting vehicle by Id' })
  @UseGuards(EmployeeGuard)
  async getVehicleById(@Query() query: VehicleIdDto) {
    return await this.vehicleService.getVehicleById(query.vechicleId);
  }

  @Get('/search')
  @ApiProperty({ description: 'for getting vehicle by Brand' })
  @UseGuards(EmployeeGuard)
  async getVehicleByName(@Query() query: VehicleSearchDto) {
    return await this.vehicleService.getVehicleByName(query.searchValue);
  }

  @Post('/create')
  @ApiProperty({ description: 'for creating the vehicle' })
  @UseGuards(EmployeeGuard)
  async create(@Body() data: CreateVehicleDto) {
    return await this.vehicleService.createVehicle(data);
  }

  @Put('/update-vehicle')
  @ApiProperty({ description: 'for updating the vehicle' })
  @UseGuards(EmployeeGuard)
  async updateVehicle(
    @Query() query: VehicleIdDto,
    @Body() data: CreateVehicleDto,
  ) {
    return await this.vehicleService.updateVehicle(query.vechicleId, data);
  }
  @Patch('/delete-vehilce')
  @ApiProperty({ description: 'for Deleting the vehicle' })
  @UseGuards(EmployeeGuard)
  async deleteVehicle(@Query() query: VehicleIdDto) {
    return await this.vehicleService.deleteVehicle(query.vechicleId);
  }

  @Patch('/admin/verify-vehicle')
  @ApiProperty({ description: 'for verifying the vehicle' })
  @UseGuards(ManagerGuard)
  async verifyVehicle(
    @Query() query: VehicleIdDto,
    @Body() data: VerifyVehicleDto,
  ) {
    return await this.vehicleService.verifyVehicle(
      query.vechicleId,
      data.is_verified,
    );
  }
}
