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

      <section className="mb-6 rounded-xl bg-white p-5 shadow">
        <h1 className="text-2xl font-bold">Find the right product quickly</h1>
        <p className="mt-1 text-sm text-slate-500">Search by product name. Results update automatically as you type.</p>
        <input
          className="mt-4 w-full rounded border p-2"
          placeholder="Search products (example: shoes, watch, laptop)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </section>

      {loading ? <p className="mb-4">Loading products...</p> : null}

      {!loading && products.length === 0 ? (
        <div className="rounded bg-amber-50 p-4 text-amber-800">No products found. Try another search keyword.</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </>
  );
};

export default HomePage;
