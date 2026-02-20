import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCartLocal } from '../features/cartSlice.js';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  return (
    <article className="rounded-lg bg-white p-4 shadow dark:bg-slate-800">
      <img src={product.images?.[0]?.url} alt={product.name} className="h-48 w-full rounded object-cover" />
      <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
      <p className="text-sm text-slate-500">${product.price}</p>
      <div className="mt-3 flex gap-2">
        <Link className="rounded bg-slate-900 px-3 py-2 text-white" to={`/products/${product.slug}`}>
          Details
        </Link>
        <button
          className="rounded border px-3 py-2"
          onClick={() => dispatch(addToCartLocal({ product, quantity: 1 }))}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
