import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-bold text-slate-200">404</h1>
        <div className="relative -mt-16">
          <img src="/nova-logo.png" alt="NovaResume Logo" className="h-20 w-auto mx-auto drop-shadow-lg" />
        </div>
        <h2 className="mt-8 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Page not found
        </h2>
        <p className="mt-4 text-base text-slate-500">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-red-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 transition-all"
          >
            <Home className="size-4" />
            Back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
