import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../configs/axios';
import { getRandomInt } from '../../libs/helper';
export interface Product {
  name: string;
  productId: number;
  qty: number;
  price: number;
  stock: number;
}
export interface FakeProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
const getProducts = () => {
  return axiosInstance.get<Array<FakeProduct>>('/products').then((res) => res.data);
};
export const useGetProducts = () => {
  return useQuery({
    queryKey: ['fetchProducts'],
    queryFn: () => getProducts(),
    select: (data) => {
      if (data.length <= 0) return [];
      return data.map((fakeProduct) => ({
        productId: fakeProduct.id,
        name: fakeProduct.title,
        qty: getRandomInt(0, 9),
        price: fakeProduct.price,
        stock: getRandomInt(9, 99),
      }));
    },
  });
};
