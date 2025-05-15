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
import { CustomersService } from './customers.service';
import { ApiBearerAuth, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CustomerDto, CustomerIdDto, searchCustomerDto } from './customers.dto';
import { EmployeeGuard } from 'src/services/supabase/supabase.guards';

@Controller('customers')
@ApiTags('customers')
@ApiBearerAuth()
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post('/create')
  @ApiProperty({ description: 'for creating the customer' })
  @UseGuards(EmployeeGuard)
  async create(@Body() data: CustomerDto) {
    return await this.customersService.createCustomer(data);
  }
  @Put('/update-customer')
  @ApiProperty({ description: 'for update the customer' })
  @UseGuards(EmployeeGuard)
  async update_customer(
    @Query() query: CustomerIdDto,
    @Body() data: CustomerDto,
  ) {
    return await this.customersService.updateCustomer(query.customerId, data);
  }

  @Patch('/delete-customer')
  @ApiProperty({ description: 'for delete the customer' })
  @UseGuards(EmployeeGuard)
  async deleteCustomer(@Query() query: CustomerIdDto) {
    return await this.customersService.deleteCustomer(query.customerId);
  }

  @Get('/all')
  @ApiQuery({ name: 'page', type: Number })
  @ApiQuery({ name: 'pageSize', type: Number })
  @ApiQuery({ name: 'searchValue', type: String, required: false })
  @UseGuards(EmployeeGuard)
  async getAllCustomer(
    @Query() query: { page: number; pageSize: number; searchValue: string },
  ) {
    return await this.customersService.getAllCustomer(
      query.page,
      query.pageSize,
      query.searchValue,
    );
  }

  @Get('/search')
  @ApiProperty({ description: 'for fetching all the customer' })
  @UseGuards(EmployeeGuard)
  async getCustomersbyName(@Query() query: searchCustomerDto) {
    return await this.customersService.getCustomersByName(query.searchValue);
  }

  @Get('/profile')
  @ApiProperty({ description: 'for getting customer by id the customer' })
  @UseGuards(EmployeeGuard)
  async getcustomerById(@Query() query: CustomerIdDto) {
    return await this.customersService.getCustomerById(query.customerId);
  }
}
