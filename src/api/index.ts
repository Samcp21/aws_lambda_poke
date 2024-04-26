const axios = require("axios");

const axiosclient = axios.create({
  timeout: 1000 * 20,
});

interface ApiResponse {
  status: boolean;
  message: string;
  data?: any;
}
export const GET_API_POKE = async (
  id: string | number
): Promise<ApiResponse> => {
  try {
    console.log("GET_API_POKE");
    const { data } = await axiosclient({
      method: "GET",
      url: `/pokemon/${id}`,
      baseURL: process.env.URL_POKE_API,
    });
    console.log("data",data);
    
    return {
      status: true,
      message: "success",
      data,
    };
  } catch (error) {
    console.error("error", error);
    throw new Error("Some error");
  }
};
