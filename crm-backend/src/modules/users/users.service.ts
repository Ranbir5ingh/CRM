import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './users.dto';
import { SupabaseService } from 'src/services/supabase/supabase.service';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class UsersService {
  private supabase: SupabaseClient;
  private supabaseBroswer: SupabaseClient;
  constructor(private readonly supabaseService: SupabaseService) {
    this.supabase = this.supabaseService.getClient();
    this.supabaseBroswer = this.supabaseService.getBrowserClient();
  }

  async createUser(userData: CreateUserDto) {
    const { data, error } = await this.supabase.auth.admin.createUser({
      email: userData.email,
      password: userData.password,
      email_confirm: true,
      user_metadata: {
        name: userData.name,
      },
    });

    if (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
    const { data: employee, error: employeeError } = await this.supabase
      .from('employees')
      .insert({
        id: data.user.id,
        name: userData.name,
        email: userData.email,
      });

    if (employeeError) {
      console.log({ employeeError });
      throw new BadRequestException(employeeError.message);
    }
    return data;
  }

  async updateRole(userId: string, role: string) {
    const { data, error } =
      await this.supabaseBroswer.auth.admin.updateUserById(userId, {
        user_metadata: {
          role: role,
        },
      });
    if (error) {
      throw new BadRequestException(error.message);
    }
    return data;
  }
}
