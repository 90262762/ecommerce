import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../features/authSlice.js';

const FieldError = ({ message }) => (message ? <p className="text-sm text-red-600">{message}</p> : null);

const AuthPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm();

  const {
    register: signupRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
    reset,
  } = useForm();

  const onLogin = async (data) => {
    const result = await dispatch(login(data));
    if (!result.error) navigate('/');
  };

  const onRegister = async (data) => {
    const result = await dispatch(register(data));
    if (!result.error) {
      reset();
      navigate('/');
    }
  };

  return (
    <section className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
      <aside className="rounded-xl bg-slate-900 p-6 text-white">
        <h1 className="text-3xl font-bold">Welcome to ShopMERN</h1>
        <p className="mt-3 text-slate-200">
          Sign in to checkout faster, track your orders, and manage your profile.
        </p>
        <ul className="mt-6 space-y-3 text-sm text-slate-200">
          <li>• Secure login and account protection</li>
          <li>• Easy checkout with Razorpay</li>
          <li>• View your order history anytime</li>
        </ul>
      </aside>

      <div className="rounded-xl bg-white p-5 shadow">
        <div className="mb-4 grid grid-cols-2 rounded-lg bg-slate-100 p-1">
          <button
            className={`rounded-md px-3 py-2 text-sm font-medium ${mode === 'login' ? 'bg-white shadow' : 'text-slate-600'}`}
            onClick={() => setMode('login')}
            type="button"
          >
            Login
          </button>
          <button
            className={`rounded-md px-3 py-2 text-sm font-medium ${mode === 'register' ? 'bg-white shadow' : 'text-slate-600'}`}
            onClick={() => setMode('register')}
            type="button"
          >
            Create Account
          </button>
        </div>

        {mode === 'login' ? (
          <form className="space-y-3" onSubmit={handleLoginSubmit(onLogin)}>
            <h2 className="text-xl font-semibold">Login to your account</h2>
            <p className="text-sm text-slate-500">Use your email and password to continue.</p>
            <label className="block text-sm font-medium">Email</label>
            <input
              className="w-full rounded border p-2"
              {...loginRegister('email', { required: 'Email is required' })}
              placeholder="you@example.com"
            />
            <FieldError message={loginErrors.email?.message} />
            <label className="block text-sm font-medium">Password</label>
            <input
              className="w-full rounded border p-2"
              type="password"
              {...loginRegister('password', { required: 'Password is required' })}
              placeholder="••••••••"
            />
            <FieldError message={loginErrors.password?.message} />
            <button type="submit" className="w-full rounded bg-slate-900 px-4 py-2 text-white">
              Login
            </button>
          </form>
        ) : (
          <form className="space-y-3" onSubmit={handleRegisterSubmit(onRegister)}>
            <h2 className="text-xl font-semibold">Create your account</h2>
            <p className="text-sm text-slate-500">It takes less than a minute.</p>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              className="w-full rounded border p-2"
              {...signupRegister('name', { required: 'Name is required' })}
              placeholder="John Doe"
            />
            <FieldError message={registerErrors.name?.message} />
            <label className="block text-sm font-medium">Email</label>
            <input
              className="w-full rounded border p-2"
              {...signupRegister('email', { required: 'Email is required' })}
              placeholder="you@example.com"
            />
            <FieldError message={registerErrors.email?.message} />
            <label className="block text-sm font-medium">Password</label>
            <input
              className="w-full rounded border p-2"
              type="password"
              {...signupRegister('password', {
                required: 'Password is required',
                minLength: { value: 8, message: 'Password must be at least 8 characters' },
              })}
              placeholder="Minimum 8 characters"
            />
            <FieldError message={registerErrors.password?.message} />
            <button type="submit" className="w-full rounded bg-slate-900 px-4 py-2 text-white">
              Create Account
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default AuthPage;
