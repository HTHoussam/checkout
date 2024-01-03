import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../configs/axios';
import { CheckoutFormData } from '../../libs/ValidationSchema';

const postCheckout = (data: CheckoutFormData) => {
  axiosInstance.post('/checkout', data).then((res) => res.data);
};
export const usePostCheckout = () => {
  return useMutation({
    mutationFn: async (data: CheckoutFormData) => await postCheckout(data),
    onSuccess: () => {
      toast.success('Checkout Successfull');
      return;
    },
    onMutate: () => {
      toast.loading('Checking out ...');
    },
    onError: () => {
      toast.error('Error while checking out,try again');
      return;
    },
  });
};
