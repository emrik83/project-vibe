import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ModelGrid } from '../components/model/ModelGrid';
import { ModelSidebar } from '../components/ModelSidebar';
import { ModelFilter } from '../components/ModelFilter';
import { useModelStore } from '../stores/modelStore';

function ModelsPage() {
  const { loadModels, models, filteredModels, setFilters } = useModelStore();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    loadModels();
  }, [loadModels]);

  useEffect(() => {
    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');
    if (category) {
      setFilters({ category, subCategory: subcategory || undefined });
    }
  }, [searchParams, setFilters]);

  // Use filtered models if available, otherwise show all models
  const displayModels = filteredModels.length > 0 ? filteredModels : models;

  const currentCategory = searchParams.get('category');
  const currentSubcategory = searchParams.get('subcategory');

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="flex">
        <ModelSidebar />
        
        <div className="flex-1 md:ml-64">
          <div className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <h1 className="text-xl md:text-2xl font-light">
                {currentCategory ? (
                  <>
                    {currentCategory}
                    {currentSubcategory && ` > ${currentSubcategory}`}
                  </>
                ) : '3D Models'}
              </h1>
              <ModelFilter />
            </div>

            {displayModels.length > 0 ? (
              <ModelGrid models={displayModels} />
            ) : (
              <div className="text-center py-12 text-gray-500">
                No models found matching your criteria
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModelsPage;