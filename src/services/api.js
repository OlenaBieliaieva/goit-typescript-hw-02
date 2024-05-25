import axios from "axios";

const ACCESS_KEY = "9_erqFiRh9aC5SJvCX8FpWIMvGXrAsqk-4hLtYlHzMA";

axios.defaults.baseURL = "https://api.unsplash.com";

export const getPhotos = async (query, page) => {
  const { data } = await axios.get(
    `/search/photos?query=${query}&page=${page}&per_page=12&client_id=${ACCESS_KEY}`
  );
  return data;
};
