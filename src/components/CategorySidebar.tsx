import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { categories } from '../types/model';
import { useModelStore } from '../stores/modelStore';

export function CategorySidebar() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { setFilters, clearFilters } = useModelStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
    clearFilters(); // Clear all existing filters first
    setFilters({ category }); // Set only the category filter
    setSearchParams({ category });
    navigate(`/models?category=${category}`);
    setIsMobileMenuOpen(false);
  };

  const handleSubCategoryClick = (category: string, subCategory: string) => {
    clearFilters(); // Clear all existing filters first
    setFilters({ category, subCategory }); // Set both category and subcategory
    setSearchParams({ category, subCategory });
    navigate(`/models?category=${category}&subcategory=${subCategory}`);
    setIsMobileMenuOpen(false);
  };

  const isActiveCategory = (category: string) => {
    return searchParams.get('category') === category;
  };

  const isActiveSubCategory = (subCategory: string) => {
    return searchParams.get('subcategory') === subCategory;
  };

  return (
    <>
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-20 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
      >
        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`} 
        onClick={() => setIsMobileMenuOpen(false)} 
      />

      <div className={`
        fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-white z-40
        transform transition-transform duration-300 ease-in-out
        md:transform-none md:transition-none
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        overflow-y-auto pb-24 border-r border-gray-200
      `}>
        <div className="p-4">
          <h2 className="font-medium mb-4">Categories</h2>
          <div className="space-y-2">
            {Object.entries(categories).map(([category, subCategories]) => (
              <div key={category} className="border-b border-gray-100 last:border-0">
                <button
                  onClick={() => handleCategoryClick(category)}
                  className={`w-full flex items-center justify-between py-2 transition-colors ${
                    isActiveCategory(category) ? 'text-blue-600 font-medium' : 'hover:text-blue-600'
                  }`}
                >
                  <span className="text-sm">{category}</span>
                  {subCategories.length > 0 && (
                    expandedCategory === category ? 
                      <ChevronDown className="h-4 w-4" /> : 
                      <ChevronRight className="h-4 w-4" />
                  )}
                </button>
                {expandedCategory === category && (
                  <div className="ml-4 space-y-1 pb-2">
                    {subCategories.map((subCategory) => (
                      <button
                        key={subCategory}
                        onClick={() => handleSubCategoryClick(category, subCategory)}
                        className={`block w-full text-left text-sm py-1 transition-colors ${
                          isActiveSubCategory(subCategory)
                            ? 'text-blue-600 font-medium'
                            : 'text-gray-600 hover:text-blue-600'
                        }`}
                      >
                        {subCategory}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}