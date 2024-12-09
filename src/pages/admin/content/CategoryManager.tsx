import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save } from 'lucide-react';
import { FileUpload } from '../../../components/admin/FileUpload';
import { categories } from '../../../types/model';

interface CategoryForm {
  name: string;
  description: string;
  subCategories: string[];
  image?: File;
}

export function CategoryManager() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<CategoryForm>({
    name: '',
    description: '',
    subCategories: []
  });

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setFormData({
      name: category,
      description: '',
      subCategories: [...categories[category]]
    });
    setEditMode(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubCategoryChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      subCategories: prev.subCategories.map((sub, i) => 
        i === index ? value : sub
      )
    }));
  };

  const handleAddSubCategory = () => {
    setFormData(prev => ({
      ...prev,
      subCategories: [...prev.subCategories, '']
    }));
  };

  const handleRemoveSubCategory = (index: number) => {
    setFormData(prev => ({
      ...prev,
      subCategories: prev.subCategories.filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = (file: File) => {
    setFormData(prev => ({
      ...prev,
      image: file
    }));
  };

  const handleSave = async () => {
    try {
      // Here you would typically save to your backend
      console.log('Saving category:', formData);
      setEditMode(false);
    } catch (error) {
      console.error('Failed to save category:', error);
    }
  };

  const handleDelete = async () => {
    if (!selectedCategory || !window.confirm('Are you sure you want to delete this category?')) {
      return;
    }

    try {
      // Here you would typically delete from your backend
      console.log('Deleting category:', selectedCategory);
      setSelectedCategory(null);
      setFormData({
        name: '',
        description: '',
        subCategories: []
      });
    } catch (error) {
      console.error('Failed to delete category:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Category Management</h2>
        <button 
          onClick={() => {
            setSelectedCategory(null);
            setEditMode(true);
            setFormData({ name: '', description: '', subCategories: [] });
          }}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-900"
        >
          <Plus className="h-4 w-4" />
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Categories List */}
        <div className="lg:col-span-1 bg-white rounded-lg p-6">
          <h3 className="font-medium mb-4">Categories</h3>
          <div className="space-y-2">
            {Object.keys(categories).map((category) => (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={`w-full text-left px-4 py-2 rounded-md hover:bg-gray-50 ${
                  selectedCategory === category ? 'bg-gray-50' : ''
                }`}
              >
                {category}
                <span className="text-sm text-gray-500 ml-2">
                  ({categories[category].length})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Category Editor */}
        <div className="lg:col-span-2 bg-white rounded-lg p-6">
          {(selectedCategory || editMode) ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">
                  {editMode ? 'Add New Category' : `Edit Category: ${selectedCategory}`}
                </h3>
                {selectedCategory && !editMode && (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setEditMode(true)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={handleDelete}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-md"
                    readOnly={!editMode}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-md"
                    rows={4}
                    readOnly={!editMode}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Category Image
                  </label>
                  <FileUpload 
                    accept="image/*"
                    onFileSelect={handleImageUpload}
                    preview={true}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Subcategories *
                  </label>
                  <div className="space-y-2">
                    {formData.subCategories.map((sub, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={sub}
                          onChange={(e) => handleSubCategoryChange(index, e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-200 rounded-md"
                          readOnly={!editMode}
                        />
                        {editMode && (
                          <button 
                            onClick={() => handleRemoveSubCategory(index)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    {editMode && (
                      <button 
                        onClick={handleAddSubCategory}
                        className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                      >
                        <Plus className="h-4 w-4" />
                        Add Subcategory
                      </button>
                    )}
                  </div>
                </div>

                {editMode && (
                  <div className="flex justify-end gap-4 pt-4">
                    <button 
                      onClick={() => {
                        if (selectedCategory) {
                          handleCategorySelect(selectedCategory);
                        } else {
                          setEditMode(false);
                          setFormData({
                            name: '',
                            description: '',
                            subCategories: []
                          });
                        }
                      }}
                      className="px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleSave}
                      className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-900"
                    >
                      <Save className="h-4 w-4" />
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              Select a category to edit or create a new one
            </div>
          )}
        </div>
      </div>
    </div>
  );
}