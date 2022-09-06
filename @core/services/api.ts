import axios from "axios";

export const apiService = axios.create({
  baseURL: 'https://api.jikan.moe/v4/',
  timeout: 20000
});