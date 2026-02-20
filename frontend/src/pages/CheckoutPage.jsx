import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { orderService } from '../services/orderService.js';

const CheckoutPage = () => {
  const { items } = useSelector((state) => state.cart);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const payload = {
      shippingAddress: {
        line1: data.line1,
        city: data.city,
        postalCode: data.postalCode,
        country: data.country,
      },
    };
    const response = await orderService.create(payload);
    window.location.href = response.data.checkoutUrl;
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 rounded bg-white p-4 shadow">
        <h2 className="text-xl font-semibold">Shipping</h2>
        <input className="w-full rounded border p-2" placeholder="Address" {...register('line1', { required: true })} />
        <input className="w-full rounded border p-2" placeholder="City" {...register('city', { required: true })} />
        <input className="w-full rounded border p-2" placeholder="Postal Code" {...register('postalCode', { required: true })} />
        <input className="w-full rounded border p-2" placeholder="Country" {...register('country', { required: true })} />
        <button className="rounded bg-slate-900 px-4 py-2 text-white">Pay with Stripe</button>
      </form>
      <div className="rounded bg-white p-4 shadow">
        <h3 className="text-lg font-semibold">Order Summary</h3>
        {items.map((item) => (
          <p key={item.product._id}>
            {item.product.name} x {item.quantity}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CheckoutPage;
