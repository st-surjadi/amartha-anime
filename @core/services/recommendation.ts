import { apiService } from "./api"

export const getAnimeRecommendations = async () => {
  const res = await apiService({
    url: 'recommendations/anime',
    method: 'GET',
  });
  return res.data;
}