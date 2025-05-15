import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateUserDto, userIdDto } from './users.dto';
import {
  Adminguard,
  ManagerGuard,
} from 'src/services/supabase/supabase.guards';
import { RequestDto } from 'src/core/dto/http-Request.dto';
import { updateRoleDto } from 'src/services/supabase/subabase.dto';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create')
  @ApiOperation({ summary: 'For creating users' })
  @ApiResponse({ status: 201, description: 'Success' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  // @UseGuards(ManagerGuard)
  async create(@Body() data: CreateUserDto) {
    return await this.usersService.createUser(data);
  }
  @Post('/update-role')
  @ApiOperation({ summary: 'For creating users' })
  @ApiResponse({ status: 201, description: 'Success' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @UseGuards(Adminguard)
  async updateRole(@Query() query: userIdDto, @Body() data: updateRoleDto) {
    return await this.usersService.updateRole(query.userId, data.role);
  }
}
