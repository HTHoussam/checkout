import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Product } from '../../apis/products/queries';

const ItemsCard = ({ fetchedData }: { fetchedData: Product[] }) => {
  const [productsData, setProductsData] = useState<Product[]>([]);

  useEffect(() => {
    if (fetchedData) setProductsData(fetchedData);
  }, [fetchedData]);

  const totalProductsPrice = useMemo(() => {
    if (!fetchedData) return 0;
    return fetchedData.reduce((total, product) => total + product.price * product.qty, 0);
  }, [fetchedData]);

  const quantityChangeHandler = useCallback(
    (productId: number, newQuantity: number) => {
      const updatedProductsData = productsData.map((product) =>
        product.productId === productId ? { ...product, qty: newQuantity } : product,
      );
      setProductsData(updatedProductsData);
    },
    [productsData],
  );

  return (
    <div className="overflow-auto h-full max-h-[700px] ">
      {productsData?.map((product) => (
        <div key={product.productId} className="bg-white rounded-lg shadow p-4">
          <div className="flex flex-row items-center px-8 py-4">
            <div className="flex-1">
              <h3 className="font-bold">Total</h3>
              <span>{totalProductsPrice.toFixed(2)}</span>
            </div>
            <div className="flex-1 flex flex-row">
              <div className="flex flex-row justify-between w-full">
                <div className="flex-[0.5]">
                  <img src="/src/assets/imgs/laptop.png" alt="product-img" />
                </div>
                <div className="flex-1">
                  <h6 className="capitalize mb-2 font-semibold">{product.name}</h6>
                  <div>
                    <span>Qty</span>
                    <select
                      value={product.qty}
                      onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                        const newQuantity = parseInt(e.target.value, 10);
                        quantityChangeHandler(product.productId, newQuantity);
                      }}
                      data-te-select-init
                      className="bg-slate-100 capitalize p-1 max-h-12 ml-4"
                    >
                      {Array.from({ length: product.stock }, (_, index) => index + 1).map((num) => (
                        <option value={num} key={num} className="p-2">
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemsCard;
