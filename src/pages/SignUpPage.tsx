import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Library, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import type { SignUpData } from '../types/auth';

const professions = [
  'Architect',
  '3D Artist',
  'Interior Designer',
  'Game Developer',
  'Product Designer',
  'Visualization Artist',
  'Other'
];

function SignUpPage() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [formData, setFormData] = useState<SignUpData>({
    username: '',
    email: '',
    password: '',
    profession: '',
    company: '',
    acceptTerms: false
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.acceptTerms) {
      setError('Please accept the terms and conditions');
      return;
    }

    try {
      await signUp(formData);
      navigate('/join?registered=true');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create account');
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/10" />
        <div className="relative z-10 p-12 flex flex-col justify-between">
          <div>
            <Link to="/" className="bg-white p-2 rounded inline-block">
              <Library className="h-8 w-8" />
            </Link>
            <h1 className="text-3xl font-light text-white mt-12 mb-4">
              Join the VI-Library Community
            </h1>
            <p className="text-lg text-gray-300">
              Get access to thousands of high-quality 3D models and join a community of creative professionals.
            </p>
          </div>
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} VI-LIBRARY. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-12 text-center">
            <Link to="/" className="bg-white p-2 rounded inline-block">
              <Library className="h-8 w-8" />
            </Link>
          </div>

          <h2 className="text-2xl font-medium mb-8">Create your account</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-1 focus:ring-black focus:border-black"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-1 focus:ring-black focus:border-black"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-1 focus:ring-black focus:border-black"
                required
                minLength={8}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profession
              </label>
              <select
                name="profession"
                value={formData.profession}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-1 focus:ring-black focus:border-black"
                required
              >
                <option value="">Select your profession</option>
                {professions.map(profession => (
                  <option key={profession} value={profession}>{profession}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company (Optional)
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-1 focus:ring-black focus:border-black"
              />
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleInputChange}
                  className="w-4 h-4 border-gray-300 rounded text-black focus:ring-black"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label className="text-gray-600">
                  I agree to the{' '}
                  <Link to="/terms" className="text-black hover:underline">Terms of Service</Link>
                  {' '}and{' '}
                  <Link to="/privacy" className="text-black hover:underline">Privacy Policy</Link>
                </label>
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full">
              Create Account
            </Button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/join" className="text-black font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;