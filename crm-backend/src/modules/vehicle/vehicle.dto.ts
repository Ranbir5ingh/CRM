import {
  IsOptional,
  IsString,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsDate,
  IsInt,
  IsPositive,
  IsUrl,
  Min,
  MaxLength,
  IsUUID,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

enum FuelType {
  PETROL = 'PETROL',
  DIESEL = 'DIESEL',
  ELECTRIC = 'ELECTRIC',
  HYBRID = 'HYBRID',
}

enum VEHICLE_STATUS {
  AVAILABLE = 'AVAILABLE',
  RENTAL = 'RENTAL',
  MAINTENANCE = 'MAINTENANCE',
  INACTIVE = 'INACTIVE',
}

export class CreateVehicleDto {
  @ApiPropertyOptional({ example: 'HR26DK8337' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  vehicle_number?: string;

  @ApiPropertyOptional({ example: 'Toyota' })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiPropertyOptional({ example: 'Innova Crysta' })
  @IsOptional()
  @IsString()
  model?: string;

  @ApiPropertyOptional({ example: 2022 })
  @IsOptional()
  @IsInt()
  @Min(1980)
  manufacture_year?: number;

  @ApiPropertyOptional({
    enum: VEHICLE_STATUS,
    example: VEHICLE_STATUS.AVAILABLE,
  })
  @IsOptional()
  @IsEnum(VEHICLE_STATUS)
  vehicle_status?: VEHICLE_STATUS;

  @ApiPropertyOptional({ enum: FuelType, example: FuelType.PETROL })
  @IsOptional()
  @IsEnum(FuelType)
  fuel_type?: FuelType;

  @ApiPropertyOptional({ example: 5 })
  @IsOptional()
  @IsInt()
  @Min(1)
  seating_capacity?: number;

  @ApiPropertyOptional({ example: 2500 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  rental_price_per_day?: number;

  @ApiPropertyOptional({ example: 'White' })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiPropertyOptional({ example: 18 })
  @IsOptional()
  @IsNumber()
  mileage?: number;

  @ApiPropertyOptional({ example: '2025-03-31' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  insurance_valid_till?: Date;

  @ApiPropertyOptional({ example: '2025-03-31' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  pollution_valid_date?: Date;

  @ApiPropertyOptional({ example: '2024-12-15' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  last_service_date?: Date;

  @ApiPropertyOptional({ example: 'https://example.com/image.jpg' })
  @IsOptional()
  @IsUrl()
  vehicle_image?: string;

  @ApiPropertyOptional({ example: 'https://example.com/registration.pdf' })
  @IsOptional()
  @IsUrl()
  registration_doc?: string;
}

export class VerifyVehicleDto {
  @ApiProperty({ example: true, description: 'for verifying the vehicle' })
  @IsBoolean()
  is_verified: boolean;
}
export class VehicleIdDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  vechicleId: string;
}

export class VehicleSearchDto {
  @ApiProperty({ example: 'tata', description: 'search by brand or model' })
  @IsString()
  searchValue: string;
}
