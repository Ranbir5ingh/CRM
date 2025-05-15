import { BadRequestException, Injectable } from '@nestjs/common';
import { CustomerDto } from './customers.dto';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from 'src/services/supabase/supabase.service';

@Injectable()
export class CustomersService {
  private supabase: SupabaseClient;
  constructor(private readonly supabaseService: SupabaseService) {
    this.supabase = this.supabaseService.getClient();
  }
  async createCustomer(data: CustomerDto) {
    const { data: customer, error } = await this.supabase
      .from('customers')
      .insert(data)
      .select('*');

    if (error)
      throw new BadRequestException(
        `Error creating customer: ${error.message}`,
      );

    return customer;
  }
  async getActiveCustomers() {
    const { count, error } = await this.supabase
      .from('customers')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'ACTIVE');

    if (error) throw new BadRequestException('error fetching customers');
    return count;
  }

  async updateCustomer(customerId: string, data: CustomerDto) {
    const { data: customer, error } = await this.supabase
      .from('customers')
      .update(data)
      .eq('id', customerId)
      .select('*')
      .maybeSingle();

    if (error)
      throw new BadRequestException(
        `Error creating customer: ${error.message}`,
      );

    return customer;
  }
  async getCustomersByName(value: string) {
    const { data: filteredCustomer, error } = await this.supabase
      .from('customers')
      .select()
      .eq('status', 'ACTIVE')
      .or(`full_name.ilike.%${value}%,phone.ilike.%${value}%`);

    if (error)
      throw new BadRequestException(`Error fetching customer ${error.message}`);
    return filteredCustomer;
  }

  async getAllCustomer(
    page: number,
    pageSize: number,
    searchValue: string = '',
  ) {
    const { data: allcustomer, error } = await this.supabase
      .from('customers')
      .select(
        `*,
        rentals (*)`,
      )
      .range((page - 1) * pageSize, page * pageSize - 1)
      .or(`full_name.ilike.%${searchValue}%,phone.ilike.%${searchValue}%`)
      .neq('status', 'DELETED')
      .order('created_at', { ascending: true });

    const { count: customerCount, error: counterror } = await this.supabase
      .from('customers')
      .select('*', { count: 'exact', head: true });

    console.log({ customerCount });
    console.log({ error });
    if (error)
      throw new BadRequestException(
        `Error Fetching customers: ${error.message}`,
      );
    return { data: allcustomer, total: customerCount };
  }

  async getCustomerById(customerId: string) {
    const { data: customer, error } = await this.supabase
      .from('customers')
      .select(
        `
      *,
      rentals(
        *,
        vehicles(
        id,
        brand,
        model,
        vehicle_number
        )
      )
    `,
      )
      .eq('id', customerId)
      .single();

    if (error)
      throw new BadRequestException(
        `Error Fetching customer: ${error.message}`,
      );

    if (customer && customer.rentals) {
      customer.rentals = customer.rentals.filter(
        (rental) => rental.status !== 'DELETED',
      );
    }
    return customer;
  }

  async deleteCustomer(customerId: string) {
    const { data, error } = await this.supabase
      .from('customers')
      .update({ status: 'DELETED' })
      .eq('id', customerId)
      .select('*')
      .maybeSingle();
    if (error)
      throw new BadRequestException(
        `Error deleting customer: ${error.message}`,
      );
    return data;
  }
}
