export type VehicleDetail = {
  id: string;
  brand: string;
  model: string;
  vehicle_number: string;
};

export type RentalDetail = {
  id: string;
  title: string;
  status: string;
  advance: number;
  endDate: string;
  startDate: string;
  vehicleId: string;
  created_at: string;
  customerId: string;
  totalAmount: number;
  vehicles: VehicleDetail;
};

export type CustomerDetail = {
  id: string;
  created_at: string;
  email: string;
  full_name: string;
  address: string;
  aadharFront?: string;
  profile?: string;
  is_aadhar_verified: boolean;
  is_driving_licence_verified: boolean;
  phone: string;
  date_of_birth: string;
  gender: string;
  status: string;
  aadharBack?: string;
  drivingLic?: string;
  rentals: RentalDetail[];
};
