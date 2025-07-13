import { axiosClient } from "../axios";

import { AxiosError } from "axios";

export const logout = async (): Promise<{ error?: string }> => {
  try {
    const res = await axiosClient.post("/auth/logout");
    return {};
  } catch (ex) {
    if (ex instanceof AxiosError) {
      return {
        error: ex.response?.data?.error,
      };
    }
  }
  return {
    error: "Unknown error, please try again later.",
  };
};
