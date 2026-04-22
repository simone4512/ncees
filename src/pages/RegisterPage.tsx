import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { register, clearError } from '../store/slices/authSlice';

const RegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((s) => s.auth);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');

  // Clear slice error on unmount
  useEffect(() => () => { dispatch(clearError()); }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');

    if (!name || !email || !password || !confirmPassword) {
      setLocalError('All fields are required');
      return;
    }
    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters');
      return;
    }

    const result = await dispatch(register({ name, email, password, password_confirmation: confirmPassword }));

    if (register.fulfilled.match(result)) {
      toast.success('Account created! Please log in.');
      navigate('/login');
    }
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-slate-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h1>
        <p className="text-slate-600 mb-6">Join thousands of engineers preparing for their licensure exam</p>

        {displayError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
            <AlertCircle size={20} />
            <span>{displayError}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              placeholder="John Doe"
              disabled={loading}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              placeholder="you@example.com"
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              placeholder="••••••••"
              disabled={loading}
            />
            <p className="text-xs text-slate-500 mt-1">Minimum 6 characters</p>
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 text-white py-2 rounded-lg font-semibold hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-4 text-center text-slate-600">
          Already have an account?{' '}
          <a href="/login" className="text-primary-600 hover:text-primary-700 font-semibold">
            Log In
          </a>
        </p>

        <p className="mt-4 text-xs text-slate-500 text-center">
          By registering, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
