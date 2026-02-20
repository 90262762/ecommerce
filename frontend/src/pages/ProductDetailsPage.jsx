import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductDetails } from '../features/productSlice.js';

const ProductDetailsPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { selected } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductDetails(slug));
  }, [dispatch, slug]);

  if (!selected) return <p>Loading...</p>;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <img src={selected.images?.[0]?.url} alt={selected.name} className="rounded" />
      <div>
        <h1 className="text-2xl font-bold">{selected.name}</h1>
        <p className="mt-4">{selected.description}</p>
        <p className="mt-2 text-xl font-semibold">${selected.price}</p>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
