import { apiService } from "./api";

export const getAnimeById = async (id: any) => {
  const res = await apiService({
    url: `anime/${id}`,
    method: 'GET',
  });
  return res.data;
}

export const getAnimeCharactersById = async (id: any) => {
  const res = await apiService({
    url: `anime/${id}/characters`,
    method: 'GET',
  });
  return res.data;
}