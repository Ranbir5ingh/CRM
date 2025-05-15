import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVehicleDto, VehicleIdDto } from './vehicle.dto';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from 'src/services/supabase/supabase.service';

@Injectable()
export class VehiclesService {
  private supabase: SupabaseClient;
  constructor(private readonly supabaseService: SupabaseService) {
    this.supabase = this.supabaseService.getClient();
  }

  async createVehicle(data: CreateVehicleDto) {
    const { data: vehicle, error } = await this.supabase
      .from('vehicles')
      .insert(data)
      .select('*');
    if (error)
      throw new BadRequestException(
        `Error registering  vehicle: ${error.message}`,
      );
    return vehicle;
  }

  async getAllVehicle(
    page: number,
    pageSize: number,
    searchValue: string = '',
  ) {
    const { data: allVehicle, error } = await this.supabase
      .from('vehicles')
      .select('*')
      .or(`brand.ilike.%${searchValue}%,model.ilike.%${searchValue}%`)
      .range((page - 1) * pageSize, page * pageSize - 1)
      .neq('vehicle_status', 'DELETED')
      .order('created_at', { ascending: true });

    const { count, error: countError } = await this.supabase
      .from('vehicles')
      .select('*', { count: 'exact', head: true });

    if (error)
      throw new BadRequestException(
        `Error Fetching vehicles: ${error.message}`,
      );
    return { data: allVehicle, total: count };
  }
  async getVehiclesCountsByStatus() {
    const { data, error } = await this.supabase.rpc(
      'get_vehicle_status_counts',
    );
    if (error) throw new BadRequestException('error fetching vehicle counts');
    return data;
  }

  async getVehicleByName(value: string) {
    const { data: filteredVehicle, error } = await this.supabase
      .from('vehicles')
      .select()
      .eq('vehicle_status', 'AVAILABLE')
      .or(`brand.ilike.%${value}%,model.ilike.%${value}%`);

    if (error)
      throw new BadRequestException(`Error fetching customer ${error.message}`);
    return filteredVehicle;
  }

  async updateVehicle(vehicleId: string, data: CreateVehicleDto) {
    const { data: vehicle, error } = await this.supabase
      .from('vehicles')
      .update(data)
      .eq('id', vehicleId)
      .select('*')
      .single();
    if (error)
      throw new BadRequestException(`Error updating vehicle: ${error.message}`);
    return vehicle;
  }

  async changeVehicleStatus(id: string, status: string) {
    const { data: vehicle, error } = await this.supabase
      .from('vehicles')
      .update({ vehicle_status: status })
      .eq('id', id)
      .select('*')
      .single();

    console.log({ status: vehicle });

    if (error) {
      console.log(error);
      throw new BadRequestException(
        'vehilce status not updated',
        error.message,
      );
    }

    return vehicle;
  }

  async getVehicleById(vehicleId: string) {
    const { data: vehicle, error } = await this.supabase
      .from('vehicles')
      .select('*')
      .eq('id', vehicleId)
      .single();
    if (error)
      throw new BadRequestException(`Error Fetching vehicle: ${error.message}`);
    return vehicle;
  }
  async deleteVehicle(vehicleId: string) {
    const { data, error } = await this.supabase
      .from('vehicles')
      .update({ vehicle_status: 'DELETED' })
      .eq('id', vehicleId)
      .select('*')
      .maybeSingle();
    if (error)
      throw new BadRequestException(
        `Error deleting customer: ${error.message}`,
      );
    return data;
  }

  async verifyVehicle(vehicleId: string, is_verified: boolean) {
    const { data: verifiedVehicle, error } = await this.supabase
      .from('vehicles')
      .update({ is_verified: is_verified })
      .eq('id', vehicleId)
      .select('*')
      .single();
    if (error)
      throw new BadRequestException(
        `Error in Verifying vehicle: ${error.message}`,
      );
    return verifiedVehicle;
  }
}
