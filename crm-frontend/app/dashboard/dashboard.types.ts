export type graphData ={
    name:string;
    total:number
}

export type RentalRecord = {
    id: string;
    startDate: string; 
    endDate: string;   
    status: "COMPLETED" | "INPROGRESS" | "CANCELLED" | String; 
    customers: {
      email: string;
      profile: string; 
      full_name: string;
    };
    vehicles: {
      brand: string;
      model: string;
      vehicle_number: string;
    };
  };
  