import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export type SupabaseUser = {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: string;
  phone: string;
  app_metadata: {
    provider: string;
    providers: string[];
  };
  user_metadata: {
    email_verified: boolean;
  };
  is_anonymous: boolean;
};

export class SigninDto {
  @IsString()
  @IsEmail()
  @ApiProperty({
    description: 'User email',
    example: 'john@gmail.com',
  })
  email: string;
  @IsString()
  @ApiProperty({
    description: 'User email',
    example: 'admin@1234',
  })
  password: string;
}

export class updateRoleDto {
  @IsString()
  @ApiProperty({
    description: 'User role',
    example: 'ADMIN',
  })
  role: string;
}
