import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRentalDto, rentalStatus } from './rentals.dto';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from 'src/services/supabase/supabase.service';

@Injectable()
export class RentalsService {
  private readonly supabase: SupabaseClient;

  constructor(private readonly supabaseService: SupabaseService) {
    this.supabase = this.supabaseService.getClient();
  }
  async createRental(data: CreateRentalDto) {
    const { data: rental, error } = await this.supabase
      .from('rentals')
      .insert(data)
      .select()
      .single();

    if (error) {
      throw new Error(`Error creating rental: ${error.message}`);
    }

    return rental;
  }

  async updateRental(rentalId: string, data: CreateRentalDto) {
    const { data: rental, error } = await this.supabase
      .from('rentals')
      .update(data)
      .eq('id', rentalId)
      .select()
      .single();

    if (error) {
      throw new Error(`Error updating rental: ${error.message}`);
    }

    return rental;
  }
  async getAllRentals(
    page: number,
    pageSize: number,
    searchValue: string = '',
  ) {
    const { data: rentals, error } = await this.supabase
      .from('rentals')
      .select(
        `*,
      customers(
      id,
      profile,
      full_name,
      phone,
      address,
      date_of_birth
      ),
      
      vehicles(
      id,
      vehicle_image,
      vehicle_number,
      brand,
      model,
      color,
      seating_capacity,
      rental_price_per_day
      )`,
      )
      .range((page - 1) * pageSize, page * pageSize - 1)
      .ilike('title', `%${searchValue}%`)
      .neq('status', 'DELETED')
      .order('created_at', { ascending: false });

    const { count } = await this.supabase
      .from('rentals')
      .select('*', { count: 'exact', head: true });
    if (error) {
      throw new Error(`Error fetching rentals: ${error.message}`);
    }

    return { data: rentals, total: count };
  }
  async getRentalById(rentalId: string) {
    const { data: rentalData, error } = await this.supabase
      .from('rentals')
      .select(
        `*,
        customers(
        id,
        profile,
        full_name,
        phone,
        address,
        date_of_birth
        ),
        
        vehicles(
        id,
        vehicle_image,
        vehicle_number,
        brand,
        model,
        color,
        seating_capacity,
        rental_price_per_day
        )`,
      )
      .eq('id', rentalId)
      .single();
    if (error) {
      throw new Error(`Error fetching rental: ${error.message}`);
    }

    return rentalData;
  }

  async updateRentalStatus(id: string, status: string) {
    const { data: updatedRental, error } = await this.supabase
      .from('rentals')
      .update({ status: status })
      .eq('id', id)
      .select(`*,vehicles(id)`)
      .single();

    if (error)
      throw new BadRequestException('Status not changed', error.message);
    return updatedRental;
  }

  async getActiveRentals() {
    const { data, error } = await this.supabase.rpc(
      'get_rental_summary_by_week',
    );

    if (error)
      throw new BadRequestException('something went wrong', error.message);
    return data;
  }

  async getRecentRentals() {
    const { data: rentals, error } = await this.supabase
      .from('rentals')
      .select(
        `
        id,
        startDate,
        endDate,
        status,

        customers(
        profile,
        full_name,
        email
        ),
        
        vehicles(
        vehicle_number,
        brand,
        model
        )`,
      )
      .neq('status', 'DELETED')
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      throw new Error(`Error fetching rentals: ${error.message}`);
    }

    return rentals;
  }
}
