import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, Eye, Download, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Model } from '../../types/model';
import { storage } from '../../utils/storage';
import { useModelStore } from '../../stores/modelStore';

interface AdminModelsProps {
  subView?: 'all' | 'pending' | 'reported';
}

export function AdminModels({ subView = 'all' }: AdminModelsProps) {
  const { models, loadModels } = useModelStore();
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadModels();
  }, [loadModels]);

  const handleDelete = async (id: string | number) => {
    if (!window.confirm('Are you sure you want to delete this model?')) return;
    
    setIsDeleting(true);
    try {
      await storage.deleteModel(id.toString());
      await loadModels();
    } catch (error) {
      console.error('Failed to delete model:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleStatusChange = async (model: Model, newStatus: Model['status']) => {
    try {
      await storage.updateModel(model.id.toString(), { ...model, status: newStatus });
      await loadModels();
    } catch (error) {
      console.error('Failed to update model status:', error);
    }
  };

  const handleFeatureToggle = async (model: Model, feature: 'isPro') => {
    try {
      await storage.updateModel(model.id.toString(), { ...model, [feature]: !model[feature] });
      await loadModels();
    } catch (error) {
      console.error('Failed to toggle feature:', error);
    }
  };

  const filteredModels = models.filter(model => {
    if (subView === 'pending') return model.status === 'pending';
    if (subView === 'reported') return model.status === 'reported';
    return true;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">
          {subView === 'all' ? 'All Models' : 
           subView === 'pending' ? 'Pending Review' : 
           'Reported Models'}
        </h2>
        <Link 
          to="/admin/models/new"
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-900"
        >
          <Plus className="h-4 w-4" />
          Add New Model
        </Link>
      </div>

      <div className="bg-white rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Model</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Creator</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stats</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredModels.map((model) => (
                <tr key={model.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={model.thumbnails[0]} 
                        alt={model.title}
                        className="w-10 h-10 rounded object-cover"
                      />
                      <div>
                        <div className="text-sm font-medium">{model.title}</div>
                        <div className="text-xs text-gray-500">ID: {model.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <img 
                        src={model.creator.avatar}
                        alt={model.creator.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm">{model.creator.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      {model.category}
                      {model.subCategory && (
                        <span className="text-gray-500 ml-1">&gt; {model.subCategory}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={model.status}
                      onChange={(e) => handleStatusChange(model, e.target.value as Model['status'])}
                      className={`px-2 py-1 text-xs rounded-full border ${
                        model.status === 'active' ? 'bg-green-100 text-green-800 border-green-200' :
                        model.status === 'pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                        'bg-red-100 text-red-800 border-red-200'
                      }`}
                    >
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="reported">Reported</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 text-xs text-gray-500">
                      <div>👁 {model.stats.views} views</div>
                      <div>❤️ {model.stats.likes} likes</div>
                      <div>⬇️ {model.stats.downloads} downloads</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex flex-col gap-1">
                      <div>${model.price}</div>
                      <button
                        onClick={() => handleFeatureToggle(model, 'isPro')}
                        className={`text-xs px-2 py-1 rounded ${
                          model.isPro ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {model.isPro ? 'PRO' : 'Free'}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link 
                        to={`/models/${model.id}`}
                        className="p-1 hover:text-blue-600" 
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <Link
                        to={`/admin/models/edit/${model.id}`}
                        className="p-1 hover:text-green-600"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button 
                        onClick={() => handleDelete(model.id)}
                        disabled={isDeleting}
                        className="p-1 hover:text-red-600 disabled:opacity-50" 
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}