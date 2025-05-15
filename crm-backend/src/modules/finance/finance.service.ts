import { BadRequestException, Injectable } from '@nestjs/common';
import { TransactionBodyDto } from './finance.dto';
import { SupabaseService } from 'src/services/supabase/supabase.service';
import { rentalStatus } from '../rentals/rentals.dto';

@Injectable()
export class FinanceService {
  private supabase;
  constructor(private readonly supabaseService: SupabaseService) {
    this.supabase = supabaseService.getClient();
  }
  async createTransaction(data: TransactionBodyDto) {
    const { data: transaction, error } = await this.supabase
      .from('transactions')
      .insert(data)
      .select('*')
      .single();
    if (error)
      throw new BadRequestException('something went wrong', error.message);

    return transaction;
  }
  async getAllTransactios(
    page: number,
    pageSize: number,
    searchValue: string = '',
  ) {
    const { data, error } = await this.supabase
      .from('transactions')
      .select(
        `*,
        rentals(id,title,status,customers(id,full_name))`,
      )
      .range((page - 1) * pageSize, page * pageSize - 1)
      .ilike('description', `%${searchValue}%`)
      .order('created_at', { ascending: false });

    const { count } = await this.supabase
      .from('transactions')
      .select('*', { count: 'exact', head: true });
    if (error) {
      throw new BadRequestException(
        'error fetching transactions',
        error.message,
      );
    }

    return { data, total: count };
  }

  async getTranactionsByRentalId(id: string) {
    const { data, error } = await this.supabase
      .from('transactions')
      .select('*')
      .eq('rentalId', id);

    if (error)
      throw new BadRequestException(
        'error fetching transaction',
        error.message,
      );
    return data ?? [];
  }

  async getStatsData() {
    const { data: graphData, error: graphError } = await this.supabase.rpc(
      'get_monthly_summary',
    );

    if (graphError)
      throw new BadRequestException(
        'Error fetching graphData',
        graphError.message,
      );

    return graphData;
  }

  async deleteTransactionsByRentalId(id: string) {
    const { data, error } = await this.supabase
      .from('transactions')
      .delete()
      .eq('rentalId', id);

    if (error) {
      console.log({ deletedError: error });
      throw new BadRequestException(
        'error fetching transaction',
        error.message,
      );
    }
    return data ?? [];
  }
}
