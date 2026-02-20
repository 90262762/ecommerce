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
      <nav className="container-padded flex flex-wrap items-center justify-between gap-3 py-4">
        <Link to="/" className="text-xl font-bold">
          ShopMERN
        </Link>

        <div className="flex items-center gap-3 text-sm sm:text-base">
          <Link className="rounded px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-700" to="/cart">
            Cart ({items.length})
          </Link>
          {user ? (
            <Link className="rounded px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-700" to="/profile">
              My Profile
            </Link>
          ) : (
            <Link className="rounded px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-700" to="/auth">
              Login / Register
            </Link>
          )}
          {user?.role === 'admin' ? (
            <Link className="rounded px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-700" to="/admin">
              Admin Dashboard
            </Link>
          ) : null}
          <button className="rounded border px-2 py-1" onClick={() => dispatch(toggleDarkMode())}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
