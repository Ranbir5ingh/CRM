import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsEmail,
  Matches,
  IsBoolean,
  IsDate,
  IsUUID,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

enum cutomerStatus {
  ACTIVE = 'ACTIVE',
  UNACTIVE = 'INACTIVE',
  BLACKLISTED = 'BLACKLISTED',
}
export class CustomerDto {
  @ApiPropertyOptional({
    example: 'https://profile.png',
    description: 'Profile image Url',
  })
  @IsOptional()
  @IsString()
  profile?: string;

  @ApiPropertyOptional({
    example: 123456789012,
    description: 'Aadhar number of the customer',
  })
  @IsOptional()
  aadhar_number?: number;

  @ApiPropertyOptional({
    example: 'DL-1234567890',
    description: 'Driving license number of the customer',
  })
  @IsOptional()
  @IsString()
  dl_number?: string;

  @ApiPropertyOptional({
    example: 'john',
    description: 'First name of the customer',
  })
  @IsOptional()
  @IsString()
  full_name?: string;

  @ApiPropertyOptional({
    example: 'john@gmail.com',
    description: 'Last name of the customer',
  })
  @ApiPropertyOptional({
    example: 'johndoe@gmail.com',
    description: 'Email address of the customer',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    example: '9876543210',
    description: 'Phone number (10 digits)',
  })
  @IsOptional()
  @Matches(/^[6-9]\d{9}$/, {
    message: 'Phone number must be a valid 10-digit Indian number',
  })
  phone?: string;

  @ApiPropertyOptional({
    example: 'Male',
    description: 'Gender of the customer',
  })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiPropertyOptional({
    example: 'Haryana',
    description: 'State of the customer',
  })
  @ApiPropertyOptional({
    example: 'H NO. 167, shakti nagar',
    description: 'Address of the customer',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    example: 'ACTIVE',
    description: 'Status of the rental (e.g., active, completed, cancelled)',
    default: 'active',
  })
  @IsOptional()
  @IsEnum(cutomerStatus)
  status?: cutomerStatus.ACTIVE;

  @ApiPropertyOptional({
    example: 'https://imageurl',
    description: 'Aadhar number (14 digits)',
  })
  @IsOptional()
  @IsString()
  aadharFront?: string;

  @ApiPropertyOptional({
    example: 'https://imageurl',
    description: 'Driving license number',
  })
  @ApiPropertyOptional({
    example: 'https://imageurl',
    description: 'Aadhar number (14 digits)',
  })
  @IsOptional()
  @IsString()
  aadharBack?: string;

  @ApiPropertyOptional({
    example: 'https://imageurl',
    description: 'Driving license number',
  })
  @IsOptional()
  @IsString()
  drivingLic?: string;

  @ApiPropertyOptional({ example: false, description: 'Is Aadhar verified' })
  @IsOptional()
  @IsBoolean()
  is_aadhar_verified?: boolean;

  @ApiPropertyOptional({
    example: false,
    description: 'Is driving license verified',
  })
  @IsOptional()
  @IsBoolean()
  is_driving_licence_verified?: boolean;

  @ApiPropertyOptional({
    example: '1998-07-23',
    description: 'Date of birth',
    type: String,
    format: 'date',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  date_of_birth?: Date;
}

export class CustomerIdDto {
  @ApiProperty({
    description: 'The UUID of the user',
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  @IsUUID()
  customerId: string;
}

export class searchCustomerDto {
  @ApiProperty({
    description: 'The name of the user',
    example: 'amit',
  })
  @IsString()
  searchValue: string;
}
