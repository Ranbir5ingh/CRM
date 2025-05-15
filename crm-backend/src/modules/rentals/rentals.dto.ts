import {
  IsUUID,
  IsDateString,
  IsOptional,
  IsEnum,
  IsString,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum rentalStatus {
  COMPLETED = 'COMPLETED',
  INPROGRESS = 'INPROGRESS',
  CREATED = 'CREATED',
  CANCELLED = 'CANCELLED',
  DELETED = 'DELETED',
}

export class CreateRentalDto {
  @ApiProperty({ example: 'Monali', description: 'title for rental' })
  @IsOptional()
  @IsString()
  title?: string;
  @ApiProperty({
    example: '2 days trip',
    description: 'description for rental',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 'a3f9a8f3-3b2b-4c5a-bc1d-f9ef42c4a30c',
    description: 'UUID of the customer',
  })
  @IsUUID()
  customerId: string;

  @ApiProperty({
    example: 'c8a41d6a-ea54-4c52-9292-c4a4e6d2e63b',
    description: 'UUID of the car to be rented',
  })
  @IsUUID()
  vehicleId: string;

  @ApiProperty({
    example: '2025-04-17',
    description: 'Start date of the rental',
  })
  @IsDateString()
  startDate: string;

  @ApiProperty({
    example: 1400,
    description: 'Bill of Ride',
  })
  @IsNumber()
  @IsOptional()
  totalAmount?: number;

  @ApiProperty({
    example: 500,
    description: 'Advance of Ride',
  })
  @IsNumber()
  @IsOptional()
  advance?: number;

  @ApiProperty({
    example: '2025-04-20',
    description: 'End date of the rental',
  })
  @IsDateString()
  endDate: string;
}

export class RentalIdDto {
  @ApiProperty({
    description: 'The UUID of the Rental',
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  @IsUUID()
  rentalId: string;
}
export class RentalStatusdDto {
  @ApiProperty({
    example: 'CREATED',
    description: 'Status of the rental (e.g., active, completed, cancelled)',
    default: 'CREATED',
  })
  @IsOptional()
  @IsEnum(rentalStatus)
  status: rentalStatus.CREATED;
}
