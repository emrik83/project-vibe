import React from 'react';
import { Link } from 'react-router-dom';
import { Library } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 font-medium mb-4">
              <Library className="h-6 w-6" />
              <span>VI-Library</span>
            </Link>
          </div>

          <div>
            <h3 className="font-medium mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link to="/models" className="text-sm text-gray-500 hover:text-gray-900">3D Models</Link></li>
              <li><Link to="/pricing" className="text-sm text-gray-500 hover:text-gray-900">Pricing</Link></li>
              <li><Link to="/upload" className="text-sm text-gray-500 hover:text-gray-900">Upload</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-gray-500 hover:text-gray-900">About</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-500 hover:text-gray-900">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-sm text-gray-500 hover:text-gray-900">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-gray-500 hover:text-gray-900">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} VI-Library. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}