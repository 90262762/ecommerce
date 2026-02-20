import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';

const MainLayout = () => (
  <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
    <Navbar />
    <main className="container-padded py-6">
      <Outlet />
    </main>
  </div>
);

export default MainLayout;
