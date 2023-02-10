import { apiPost, apiGet } from "@/infrastructure/axios";

interface CreateParams {
  username: string;
  content: string;
}

export interface DashboardResp {
  username: string;
  content: string;
}

// 获取面版信息
export const getDashboard = async (): Promise<DashboardResp[]> => {
  try {
    const { data } = await apiGet("/dashboard");
    return data;
  } catch (e) {
    console.log("getDashboard e:", e);
    return [];
  }
};

// 创建面版信息
export const createDashboard = async (params: CreateParams) => {
  try {
    return await apiPost("/dashboard/create", params);
  } catch (e) {
    console.log("createDashboard e:", e);
    return null;
  }
};
