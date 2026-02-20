import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../features/uiSlice.js';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const { darkMode } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  return (
    <header className="bg-white shadow dark:bg-slate-800">
      <nav className="container-padded flex items-center justify-between py-4">
        <Link to="/" className="text-xl font-bold">
          ShopMERN
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/cart">Cart ({items.length})</Link>
          {user ? <Link to="/profile">{user.name}</Link> : <Link to="/auth">Login</Link>}
          {user?.role === 'admin' && <Link to="/admin">Admin</Link>}
          <button className="rounded border px-2 py-1" onClick={() => dispatch(toggleDarkMode())}>
            {darkMode ? 'Light' : 'Dark'}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
