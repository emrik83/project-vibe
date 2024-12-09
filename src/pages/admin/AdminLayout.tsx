import React, { useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { 
  Grid, Box, Users, Tag, Image, MessageSquare, 
  Star, Shield, Settings, Bell, ChevronDown,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { AdminDashboard } from './AdminDashboard';
import { AdminModels } from './AdminModels';
import { ModelEditor } from './ModelEditor';
import { CategoryManager } from './content/CategoryManager';
import { Button } from '@/components/ui/button';

const navigationItems = [
  { icon: Grid, label: 'Dashboard', id: 'dashboard' },
  { icon: Box, label: 'Models', id: 'models', subItems: [
    { label: 'All Models', id: 'all-models' },
    { label: 'Pending Review', id: 'pending-models' },
    { label: 'Reported', id: 'reported-models' }
  ]},
  { icon: Users, label: 'Users', id: 'users' },
  { icon: Tag, label: 'Categories', id: 'categories' },
  { icon: Image, label: 'Assets', id: 'assets' },
  { icon: MessageSquare, label: 'Comments', id: 'comments' },
  { icon: Star, label: 'Reviews', id: 'reviews' },
  { icon: Shield, label: 'Permissions', id: 'permissions' },
  { icon: Settings, label: 'Settings', id: 'settings' }
];

export function AdminLayout() {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className={`bg-gray-900 text-white transition-all ${
        sidebarExpanded ? 'w-64' : 'w-20'
      } fixed h-full z-30`}>
        <div className="p-4">
          <button 
            onClick={() => setSidebarExpanded(!sidebarExpanded)}
            className="w-full flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-800"
          >
            <ChevronDown className={`h-5 w-5 transform transition-transform ${
              sidebarExpanded ? '' : 'rotate-180'
            }`} />
            {sidebarExpanded && <span>VI-LIBRARY Admin</span>}
          </button>
        </div>

        <nav className="mt-4">
          {navigationItems.map(item => (
            <div key={item.id}>
              <button
                onClick={() => {
                  setActiveView(item.id);
                  navigate(`/admin/${item.id}`);
                }}
                className={`w-full flex items-center gap-3 px-6 py-3 hover:bg-gray-800 ${
                  activeView === item.id ? 'bg-gray-800' : ''
                }`}
              >
                <item.icon className="h-5 w-5" />
                {sidebarExpanded && (
                  <span className="flex-1 text-left">{item.label}</span>
                )}
              </button>
              {sidebarExpanded && item.subItems && activeView === item.id && (
                <div className="pl-12 bg-gray-800">
                  {item.subItems.map(subItem => (
                    <button
                      key={subItem.id}
                      onClick={() => {
                        setActiveView(subItem.id);
                        navigate(`/admin/${subItem.id}`);
                      }}
                      className={`w-full text-left py-2 text-sm hover:text-white ${
                        activeView === subItem.id ? 'text-white' : 'text-gray-400'
                      }`}
                    >
                      {subItem.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className={`flex-1 ${sidebarExpanded ? 'ml-64' : 'ml-20'}`}>
        <div className="h-16 bg-white border-b flex items-center justify-between px-6 sticky top-0 z-20">
          <h1 className="text-xl font-medium">
            {activeView.split('-').map(word => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ')}
          </h1>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <Bell className="h-5 w-5" />
            </button>
            <Button 
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        <div className="p-6">
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/models" element={<AdminModels subView="all" />} />
            <Route path="/models/edit/:id" element={<ModelEditor />} />
            <Route path="/models/new" element={<ModelEditor />} />
            <Route path="/pending-models" element={<AdminModels subView="pending" />} />
            <Route path="/reported-models" element={<AdminModels subView="reported" />} />
            <Route path="/categories" element={<CategoryManager />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}