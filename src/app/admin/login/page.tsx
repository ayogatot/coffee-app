'use client';

import { useActionState } from 'react';
import { loginAdmin } from '@/app/actions/auth';
import { Lock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const initialState = { error: '' };

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const result = await loginAdmin(formData);
      if (result?.error) {
        return { error: result.error };
      }
      return prevState;
    },
    initialState
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      <Link href="/" className="absolute top-8 left-8 flex items-center text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Website
      </Link>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 tracking-tight">
          Admin Dashboard
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Enter the passcode to access the secure area
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
          <form action={formAction} className="space-y-6">
            <div>
              <label htmlFor="passcode" className="block text-sm font-medium text-slate-700">
                Passcode
              </label>
              <div className="mt-2">
                <input
                  id="passcode"
                  name="passcode"
                  type="password"
                  required
                  className="appearance-none block w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-colors"
                  placeholder="Enter your passcode"
                />
              </div>
              {state?.error && (
                <p className="mt-2 text-sm text-red-600 font-medium">
                  {state.error}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isPending}
                style={{ backgroundColor: '#0f172a', color: '#ffffff' }}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? 'Verifying...' : 'Unlock Dashboard'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
