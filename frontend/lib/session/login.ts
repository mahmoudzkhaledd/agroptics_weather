import { axiosClient } from "../axios";

import { AxiosError } from "axios";

export const login = async (): Promise<{ error?: string }> => {
  try {
    const res = await axiosClient.post("/auth/login");
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
