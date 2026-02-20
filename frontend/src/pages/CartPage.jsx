import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCartLocal, updateCartQuantity } from '../features/cartSlice.js';

const CartPage = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  const total = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Your Cart</h1>
      {items.map((item) => (
        <div key={item.product._id} className="flex items-center justify-between rounded bg-white p-4 shadow">
          <p>{item.product.name}</p>
          <input
            type="number"
            min="1"
            value={item.quantity}
            className="w-16 rounded border p-1"
            onChange={(e) =>
              dispatch(updateCartQuantity({ productId: item.product._id, quantity: Number(e.target.value) }))
            }
          />
          <button className="text-red-600" onClick={() => dispatch(removeFromCartLocal(item.product._id))}>
            Remove
          </button>
        </div>
      ))}
      <div className="flex items-center justify-between">
        <p className="text-xl font-semibold">Total: ${total.toFixed(2)}</p>
        <Link className="rounded bg-slate-900 px-4 py-2 text-white" to="/checkout">
          Checkout
        </Link>
      </div>
    </section>
  );
};

export default CartPage;
