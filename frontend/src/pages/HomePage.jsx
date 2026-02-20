import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import ProductCard from '../components/ProductCard.jsx';
import { fetchProducts } from '../features/productSlice.js';

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    dispatch(fetchProducts({ keyword }));
  }, [dispatch, keyword]);

  return (
    <>
      <Helmet>
        <title>ShopMERN | Home</title>
      </Helmet>
      <section className="space-y-4">
        <input
          className="w-full rounded border p-2"
          placeholder="Search products"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        {loading ? <p>Loading...</p> : null}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
};

export default HomePage;
