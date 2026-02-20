import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login, register } from '../features/authSlice.js';

const AuthPage = () => {
  const dispatch = useDispatch();
  const { register: fieldRegister, handleSubmit, reset } = useForm();

  const onLogin = (data) => dispatch(login(data));
  const onRegister = (data) => {
    dispatch(register(data));
    reset();
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <form className="space-y-3 rounded bg-white p-4 shadow" onSubmit={handleSubmit(onLogin)}>
        <h2 className="text-xl font-semibold">Login</h2>
        <input className="w-full rounded border p-2" {...fieldRegister('email')} placeholder="Email" />
        <input className="w-full rounded border p-2" type="password" {...fieldRegister('password')} placeholder="Password" />
        <button className="rounded bg-slate-900 px-4 py-2 text-white">Login</button>
      </form>

      <form className="space-y-3 rounded bg-white p-4 shadow" onSubmit={handleSubmit(onRegister)}>
        <h2 className="text-xl font-semibold">Register</h2>
        <input className="w-full rounded border p-2" {...fieldRegister('name')} placeholder="Name" />
        <input className="w-full rounded border p-2" {...fieldRegister('email')} placeholder="Email" />
        <input className="w-full rounded border p-2" type="password" {...fieldRegister('password')} placeholder="Password" />
        <button className="rounded bg-slate-900 px-4 py-2 text-white">Register</button>
      </form>
    </div>
  );
};

export default AuthPage;
