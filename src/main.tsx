import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './index.css';
import Checkout from './pages/checkout-page';
import CheckoutStripe from './pages/checkout-stripe';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,
      refetchOnWindowFocus: false,
    },
    mutations: {
      throwOnError: true,
    },
  },
});
const router = createBrowserRouter([
  {
    path: '/',
    element: <Checkout />,
  },
  {
    path: '/checkout-v2',
    element: <CheckoutStripe />,
  },
  {
    path: '*',
    element: <p>NOT found 404</p>,
  },
]);
const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Elements stripe={stripePromise}>
        <RouterProvider router={router} />
        <ToastContainer position="bottom-center" />
      </Elements>

      {/* <Checkout /> */}
    </QueryClientProvider>
  </React.StrictMode>,
);
