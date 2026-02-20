import { useEffect, useState } from 'react';
import { orderService } from '../services/orderService.js';

const ProfilePage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    orderService.myOrders().then((res) => setOrders(res.data.orders));
  }, []);

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">My Orders</h1>
      {orders.map((order) => (
        <article key={order._id} className="rounded bg-white p-4 shadow">
          <p>Order ID: {order._id}</p>
          <p>Status: {order.orderStatus}</p>
          <p>Payment: {order.paymentStatus}</p>
        </article>
      ))}
    </section>
  );
};

export default ProfilePage;
