import { apiService } from "./api"

export const getAnimeSearch = async (params: any) => {
  const res = await apiService({
    url: 'anime',
    method: 'GET',
    params: params
  });
  return res.data;
}