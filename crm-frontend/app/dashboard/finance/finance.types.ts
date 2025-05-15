export type graphEntry = {
  name: string;
  revenue: number;
  expenses: number;
};

export type activeRentals = {
  current_week_active_count: number;
  last_week_completed_count: number;
};

export type requestData = {
  graphData: graphEntry[];
  activeRentals: activeRentals[];
};
