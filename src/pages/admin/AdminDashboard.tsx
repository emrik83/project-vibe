import React from 'react';
import { Box, Users, Download, DollarSign, TrendingUp } from 'lucide-react';

const statsData = [
  { 
    icon: Box, 
    label: 'Total Models',
    value: '15,234',
    change: '+12%',
    color: 'bg-blue-500'
  },
  { 
    icon: Users,
    label: 'Active Users',
    value: '34,567',
    change: '+8%',
    color: 'bg-green-500'
  },
  { 
    icon: Download,
    label: 'Downloads',
    value: '45.2K',
    change: '+24%',
    color: 'bg-purple-500'
  },
  { 
    icon: DollarSign,
    label: 'Revenue',
    value: '$234,567',
    change: '+15%',
    color: 'bg-orange-500'
  }
];

export function AdminDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <h3 className="text-2xl font-medium">{stat.value}</h3>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4 text-sm">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-green-500">{stat.change}</span>
              <span className="text-gray-600">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6">
          <h3 className="font-medium mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {Array(5).fill(null).map((_, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Box className="h-4 w-4 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">
                    New model uploaded <span className="font-medium">Modern Chair 3D</span>
                  </p>
                  <p className="text-xs text-gray-500">2 hours ago by John Doe</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6">
          <h3 className="font-medium mb-4">Top Models</h3>
          <div className="space-y-4">
            {Array(5).fill(null).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Modern Chair 3D</p>
                  <p className="text-xs text-gray-500">1,234 downloads</p>
                </div>
                <div className="text-sm text-gray-500">$29.99</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}