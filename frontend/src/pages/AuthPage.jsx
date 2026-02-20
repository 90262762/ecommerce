import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../features/authSlice.js';

const AuthPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <div className="grid gap-8 md:grid-cols-2">
      <form className="space-y-3 rounded bg-white p-4 shadow" onSubmit={handleLoginSubmit(onLogin)}>
        <h2 className="text-xl font-semibold">Login</h2>
        <input
          className="w-full rounded border p-2"
          {...loginRegister('email', { required: 'Email is required' })}
          placeholder="Email"
        />
        {loginErrors.email ? <p className="text-sm text-red-600">{loginErrors.email.message}</p> : null}
        <input
          className="w-full rounded border p-2"
          type="password"
          {...loginRegister('password', { required: 'Password is required' })}
          placeholder="Password"
        />
        {loginErrors.password ? <p className="text-sm text-red-600">{loginErrors.password.message}</p> : null}
        <button type="submit" className="rounded bg-slate-900 px-4 py-2 text-white">
          Login
        </button>
      </form>

      <form className="space-y-3 rounded bg-white p-4 shadow" onSubmit={handleRegisterSubmit(onRegister)}>
        <h2 className="text-xl font-semibold">Register</h2>
        <input
          className="w-full rounded border p-2"
          {...signupRegister('name', { required: 'Name is required' })}
          placeholder="Name"
        />
        {registerErrors.name ? <p className="text-sm text-red-600">{registerErrors.name.message}</p> : null}
        <input
          className="w-full rounded border p-2"
          {...signupRegister('email', { required: 'Email is required' })}
          placeholder="Email"
        />
        {registerErrors.email ? <p className="text-sm text-red-600">{registerErrors.email.message}</p> : null}
        <input
          className="w-full rounded border p-2"
          type="password"
          {...signupRegister('password', {
            required: 'Password is required',
            minLength: { value: 8, message: 'Password must be at least 8 characters' },
          })}
          placeholder="Password"
        />
        {registerErrors.password ? <p className="text-sm text-red-600">{registerErrors.password.message}</p> : null}
        <button type="submit" className="rounded bg-slate-900 px-4 py-2 text-white">
          Register
        </button>
      </form>
    </div>
  );
};

export default AuthPage;
