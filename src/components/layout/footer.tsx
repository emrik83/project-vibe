import React from 'react';
import { Link } from 'react-router-dom';
import { Library } from 'lucide-react';

const footerLinks = {
  Product: [
    { label: '3D Models', path: '/models' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Upload', path: '/upload' },
  ],
  Company: [
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms of Service', path: '/terms' },
  ],
};

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

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-medium mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link.path}>
                    <Link 
                      to={link.path} 
                      className="text-sm text-gray-500 hover:text-gray-900"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
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