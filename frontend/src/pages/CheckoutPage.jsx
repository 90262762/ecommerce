import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { orderService } from '../services/orderService.js';

const loadRazorpayScript = () =>
  new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const CheckoutPage = () => {
  const { items } = useSelector((state) => state.cart);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      toast.error('Unable to load Razorpay checkout. Please try again.');
      return;
    }

    const payload = {
      shippingAddress: {
        line1: data.line1,
        city: data.city,
        postalCode: data.postalCode,
        country: data.country,
      },
    };

    const response = await orderService.create(payload);
    const options = {
      ...response.data.razorpay,
      handler: async (paymentResponse) => {
        await orderService.verify(paymentResponse);
        toast.success('Payment successful');
        navigate('/order-success');
      },
      theme: {
        color: '#0f172a',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', () => toast.error('Payment failed. Please retry.'));
    rzp.open();
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 rounded bg-white p-4 shadow">
        <h2 className="text-xl font-semibold">Shipping</h2>
        <input className="w-full rounded border p-2" placeholder="Address" {...register('line1', { required: true })} />
        <input className="w-full rounded border p-2" placeholder="City" {...register('city', { required: true })} />
        <input className="w-full rounded border p-2" placeholder="Postal Code" {...register('postalCode', { required: true })} />
        <input className="w-full rounded border p-2" placeholder="Country" {...register('country', { required: true })} />
        <button className="rounded bg-slate-900 px-4 py-2 text-white">Pay with Razorpay</button>
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
