import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface PropertyTotal {
  _id: string;
  count: number;
}

interface OccupancyGraph {
  _id: {
    month: number;
    year: number;
  };
  occupiedCount: number;
  month: number;
  year: number;
  occupancyRate: number;
}

interface DashboardData {
  PropertiesTotal: PropertyTotal[];
  totalTenants: number;
  newTenantsThisMonth: number;
  leasesExpiringSoon: number;
  totalMonthlyRevenue: number;
  totalExpected: number;
  collectionRate: string;
  YearlyRevenue: number;
  OverAllRevenue: number;
  totalMonthlyPending: number;
  monthlyRevenueGraph: any[];
  yearlyRevenueGraph: any[];
  occupancyGraph: OccupancyGraph[];
  paymentStatusBreakdownGraph: any[];
  rentCollectionGraph: any[];
}

interface DashboardState {
  data: DashboardData | null;
}

const initialState: DashboardState = {
  data: null,
};

const DashboardSlice = createSlice({
  name: "DashboardSlice",
  initialState,
  reducers: {
    dashboarddata: (state, action: PayloadAction<DashboardData>) => {
      state.data = action.payload;
    },
  },
});

export const { dashboarddata } = DashboardSlice.actions;
export default DashboardSlice.reducer;
