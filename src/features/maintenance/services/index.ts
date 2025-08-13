import Client from "../../../api/index";

export const AllMaintenance = async (params: any) => {
  const response = await Client.maintenance.getAll(params);
  console.log("Maintenance data getting", response);
  if (response) {
    return response;
  }
};

export const CreatMaintenance = async (params: any) => {
  const response = await Client.maintenance.create(params);
  console.log("data crated successfully", response);
  if (response) {
    return response?.data || {};
  }
};