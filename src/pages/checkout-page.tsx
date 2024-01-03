import { useGetProducts } from '../apis/products/queries';
import FormWrapper from '../components/common/form-wrapper';
import ItemsCard from './components/items-card';

export const Checkout = () => {
  const { data: fetchedData } = useGetProducts();
  return (
    <div className="container mx-auto text-center bg-gray-100">
      <h1 className="inline text-2xl font-semibold leading-none m-8">Checkout</h1>
      <div className="flex flex-row divide-x p-4 mt-4 items-start">
        <div className="flex-1 p-2">
          <FormWrapper />
        </div>
        <div className="flex-1 p-2">
          <ItemsCard fetchedData={fetchedData ?? []} key={JSON.stringify(fetchedData)} />
        </div>
      </div>
    </div>
  );
};
export default Checkout;
