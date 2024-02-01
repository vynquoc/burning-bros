import axiosClient from "./axiosClient";

const productApi = {
  getProducts: (skip: number) => {
    return axiosClient.get(
      `/products?limit=20&skip=${skip}&select=title,price,images`
    );
  },
  searchProducts: (keyword: string) => {
    return axiosClient.get(
      `/products/search?q=${keyword}&select=title,price,images`
    );
  },
};

export default productApi;
