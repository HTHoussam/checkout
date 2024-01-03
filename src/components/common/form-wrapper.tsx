import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { usePostCheckout } from '../../apis/products/mutation';
import ProductSchema, { CheckoutFormData } from '../../libs/ValidationSchema';
import ErrorSpan from './error-span';

const FormWrapper = () => {
  const { mutate } = usePostCheckout();
  const {
    register,
    reset,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    mode: 'onChange',
    defaultValues: {
      customer: {
        name: '',
        email: '',
        address: '',
      },
      paymentMethod: {
        cardNumber: '',
        cvv: '',
        expirationDate: '',
        type: 'credit_card',
      },
    },
    resolver: yupResolver(ProductSchema),
  });
  useEffect(() => {
    if (getValues('paymentMethod.cardNumber').length <= 0) {
      return;
    }
    const numericValue = getValues('paymentMethod.cardNumber').replace(/\D/g, '');
    const formattedValue = numericValue.replace(/(\d{4})/g, '$1 ').trim();
    setValue('paymentMethod.cardNumber', formattedValue);
  }, [getValues('paymentMethod.cardNumber')]);
  
  const onSubmit = useCallback(
    (formValues: CheckoutFormData) => {
      console.log('formValues', formValues);
      mutate({ ...formValues });
    },
    [mutate],
  );
  return (
    <div className="flex h-screen">
      <div className="bg-white rounded-lg shadow p-4">
        <form
          onSubmit={
            (handleSubmit(onSubmit),
            () => {
              toast.error('Validation Error');
            })
          }
        >
          <div className="mt-5 ">
            <div className="flex">
              <div className="flex-1 py-5 pl-5 overflow-hidden">
                <svg
                  className="inline align-text-top"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                >
                  <g>
                    <path
                      d="m4.88889,2.07407l14.22222,0l0,20l-14.22222,0l0,-20z"
                      fill="none"
                      id="svg_1"
                      stroke="null"
                    ></path>
                    <path
                      d="m7.07935,0.05664c-3.87,0 -7,3.13 -7,7c0,5.25 7,13 7,13s7,-7.75 7,-13c0,-3.87 -3.13,-7 -7,-7zm-5,7c0,-2.76 2.24,-5 5,-5s5,2.24 5,5c0,2.88 -2.88,7.19 -5,9.88c-2.08,-2.67 -5,-7.03 -5,-9.88z"
                      id="svg_2"
                    ></path>
                    <circle cx="7.04807" cy="6.97256" r="2.5" id="svg_3"></circle>
                  </g>
                </svg>
              </div>
            </div>
            <div className="px-5 pb-5">
              <input
                className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                {...register('customer.name')}
                placeholder="John doe"
                type="text"
              />

              {errors?.customer?.name && <ErrorSpan message={errors?.customer?.name.message ?? ''} />}
              <input
                className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                {...register('customer.email')}
                placeholder="John.doe@email.com"
                type="text"
              />
              {errors?.customer?.email && <ErrorSpan message={errors?.customer?.email.message ?? ''} />}
              <input
                className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                {...register('customer.address')}
                placeholder="21 street 130"
                type="text"
              />
              {errors?.customer?.address && <ErrorSpan message={errors?.customer?.address.message ?? ''} />}
            </div>
          </div>
          <div className="flex">
            <div className="flex-1 py-5 pl-5 overflow-hidden">
              <svg
                className="inline align-text-top"
                width="21"
                height="20.5"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
              >
                <g>
                  <path
                    d="m4.88889,2.07407l14.22222,0l0,20l-14.22222,0l0,-20z"
                    fill="none"
                    id="svg_1"
                    stroke="null"
                  ></path>
                  <path
                    d="m7.07935,0.05664c-3.87,0 -7,3.13 -7,7c0,5.25 7,13 7,13s7,-7.75 7,-13c0,-3.87 -3.13,-7 -7,-7zm-5,7c0,-2.76 2.24,-5 5,-5s5,2.24 5,5c0,2.88 -2.88,7.19 -5,9.88c-2.08,-2.67 -5,-7.03 -5,-9.88z"
                    id="svg_2"
                  ></path>
                  <circle cx="7.04807" cy="6.97256" r="2.5" id="svg_3"></circle>
                </g>
              </svg>
            </div>
            <div className="flex-none pt-2.5 pr-2.5 pl-1"></div>
          </div>
          <div className="px-5 pb-5">
            <input
              className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
              {...register('paymentMethod.cardNumber')}
              placeholder="XXXX-XXXX-XXXX-XXXX"
              type="text"
            />
            {errors?.paymentMethod?.cardNumber && (
              <ErrorSpan message={errors?.paymentMethod?.cardNumber.message ?? ''} />
            )}
            <div className="flex">
              <div className="flex-grow w-1/4 pr-2">
                <input
                  className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                  {...register('paymentMethod.cvv')}
                  placeholder="222"
                  type="text"
                />
                {errors?.paymentMethod?.cvv && <ErrorSpan message={errors?.paymentMethod?.cvv.message ?? ''} />}
              </div>
              <div className="flex-grow">
                <input
                  className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                  {...register('paymentMethod.expirationDate')}
                  placeholder="MM/YY"
                  type="text"
                />
                {errors?.paymentMethod?.expirationDate && (
                  <ErrorSpan message={errors?.paymentMethod?.expirationDate.message ?? ''} />
                )}
              </div>
            </div>
          </div>
          <hr className="mt-4" />
          <div className="flex flex-row-reverse p-3">
            <div className="flex-initial pl-3">
              <button
                type="submit"
                className="flex items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-800  focus:outline-none focus:bg-gray-900  transition duration-300 transform active:scale-95 ease-in-out"
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF">
                  <path d="M0 0h24v24H0V0z" fill="none"></path>
                  <path
                    d="M5 5v14h14V7.83L16.17 5H5zm7 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-8H6V6h9v4z"
                    opacity=".3"
                  ></path>
                  <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z"></path>
                </svg>
                <span className="pl-2 mx-1">Save</span>
              </button>
            </div>
            <div className="flex-initial">
              <button
                onClick={() => {
                  reset();
                }}
                type="button"
                className="flex items-center px-5 py-2.5 font-medium tracking-wide text-black capitalize rounded-md  hover:bg-red-200 hover:fill-current hover:text-red-600  focus:outline-none  transition duration-300 transform active:scale-95 ease-in-out"
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px">
                  <path d="M0 0h24v24H0V0z" fill="none"></path>
                  <path d="M8 9h8v10H8z" opacity=".3"></path>
                  <path d="M15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9z"></path>
                </svg>
                <span className="pl-2 mx-1">Discard</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default FormWrapper;
