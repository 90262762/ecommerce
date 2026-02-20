import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  { month: 'Jan', orders: 24 },
  { month: 'Feb', orders: 31 },
  { month: 'Mar', orders: 18 },
  { month: 'Apr', orders: 42 },
];

const AdminDashboardPage = () => (
  <section className="space-y-4">
    <h1 className="text-2xl font-bold">Admin Analytics</h1>
    <div className="h-72 rounded bg-white p-4 shadow">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="orders" fill="#0f172a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </section>
);

export default AdminDashboardPage;
