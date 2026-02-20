import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { orderService } from '../services/orderService.js';

const OrderSuccessPage = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (sessionId) orderService.verify(sessionId);
  }, [searchParams]);

  return (
    <div className="rounded bg-green-100 p-6 text-green-900">
      <h1 className="text-2xl font-bold">Payment successful 🎉</h1>
      <p>Your order has been placed and is now processing.</p>
    </div>
  );
};

export default OrderSuccessPage;
