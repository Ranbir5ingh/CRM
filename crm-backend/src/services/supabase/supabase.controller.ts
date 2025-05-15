import {
  BadRequestException,
  Body,
  Controller,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SupabaseService } from './supabase.service';
import { SigninDto, updateRoleDto } from './subabase.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Adminguard, OpenGuard } from './supabase.guards';
import { RequestDto } from 'src/core/dto/http-Request.dto';

@ApiBearerAuth()
@ApiTags('supabase')
@Controller('supabase')
export class SupabaseController {
  constructor(private readonly supabaseService: SupabaseService) {}

  @Post('signin')
  async signIn(@Body() data: SigninDto) {
    const { email, password } = data;
    const { session, error } = await this.supabaseService.signIn(
      email,
      password,
    );

    if (error) {
      throw new BadRequestException(error.message);
    }
    return {
      message: 'User signed in successfully',
      session,
    };
  }

  @Post('/update-role')
  @ApiOperation({ summary: 'For creating users' })
  @ApiResponse({ status: 201, description: 'Success' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @UseGuards(OpenGuard)
  async updateRole(@Req() req: RequestDto, @Body() data: updateRoleDto) {
    await this.supabaseService.updateRole(req.user.id, data.role);
  }
}
