import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export enum transactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export class TransactionBodyDto {
  @ApiProperty({
    description: 'Description for trancaction',
    example: 'Payment for rental',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'CustomerId for rental',
    example: '89b7270e-b913-4a0d-baa8-0795617e05f3',
  })
  @IsUUID()
  @IsOptional()
  rentalId?: string;

  @ApiProperty({ description: 'Amount of transaction', example: 5000 })
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: 'what is the type of payemnt',
    example: transactionType.INCOME,
  })
  @IsEnum(transactionType)
  type: string;
}
