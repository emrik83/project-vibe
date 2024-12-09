import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Download, Heart, Share2, Eye, Edit, Box, Ruler, Cpu, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useModelStore } from '@/stores/modelStore';
import { useAuth } from '@/contexts/AuthContext';
import { ReviewSection } from '@/components/model/ReviewSection';
import { DownloadDialog } from '@/components/model/DownloadDialog';
import { cn, formatNumber } from '@/lib/utils';

function ModelDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { models, downloadModel } = useModelStore();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { user } = useAuth();
  const [model, setModel] = useState(models.find(m => m.id.toString() === id));
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (id) {
      const foundModel = models.find(m => m.id.toString() === id);
      if (foundModel) {
        setModel(foundModel);
        setSelectedImage(foundModel.thumbnails[0]);
      }
    }
  }, [id, models]);

  if (!model) {
    return (
      <div className="pt-28 pb-16 text-center text-gray-500">
        Model not found
      </div>
    );
  }

  const handleDownload = async (version: 'original' | 'optimized') => {
    if (id) {
      await downloadModel(id, version);
      setShowDownloadDialog(false);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  // Mock reviews data
  const reviews = [
    {
      id: '1',
      user: {
        name: 'John Doe',
        avatar: 'https://source.unsplash.com/100x100/?avatar,1'
      },
      rating: 5,
      comment: 'Excellent model with great attention to detail. The topology is clean and well-optimized.',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      helpful: 12
    },
    {
      id: '2',
      user: {
        name: 'Jane Smith',
        avatar: 'https://source.unsplash.com/100x100/?avatar,2'
      },
      rating: 4,
      comment: 'Very good model overall. The textures are high quality and the UV mapping is well done.',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      helpful: 8
    }
  ];

  return (
    <div className="pt-28 pb-16">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Images */}
          <div className="space-y-6">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt={model.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="grid grid-cols-4 gap-4">
              {model.thumbnails.map((thumbnail, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(thumbnail)}
                  className={cn(
                    'aspect-square rounded-lg overflow-hidden border-2',
                    selectedImage === thumbnail ? 'border-blue-500' : 'border-transparent'
                  )}
                >
                  <img
                    src={thumbnail}
                    alt={`${model.title} - View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Details */}
          <div>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-light mb-2">{model.title}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>by {model.creator.name}</span>
                  <span>•</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    {model.creator.rating}
                  </div>
                </div>
              </div>
              {user?.role === 'admin' && (
                <Button variant="outline" size="sm" href={`/admin/models/edit/${model.id}`}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>

            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-gray-400" />
                <span>{formatNumber(model.stats.views)} views</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="h-5 w-5 text-gray-400" />
                <span>{formatNumber(model.stats.downloads)} downloads</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className={cn(
                  "h-5 w-5",
                  isLiked ? "text-red-500 fill-red-500" : "text-gray-400"
                )} />
                <span>{formatNumber(model.stats.likes)} likes</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="text-2xl font-light">
                  {model.price > 0 ? `$${model.price}` : 'Free'}
                </div>
                {model.isPro && (
                  <span className="bg-black text-white text-xs px-2 py-1 rounded">
                    PRO
                  </span>
                )}
              </div>

              <div className="space-y-4">
                <Button 
                  className="w-full" 
                  onClick={() => setShowDownloadDialog(true)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleLike}
                >
                  <Heart className={cn(
                    "h-4 w-4 mr-2",
                    isLiked ? "fill-red-500 text-red-500" : ""
                  )} />
                  {isLiked ? 'Liked' : 'Like'}
                </Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium mb-2">Description</h2>
                <p className="text-gray-600">{model.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Technical Details</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Box className="h-4 w-4" />
                      Format: {model.format}
                    </div>
                    <div className="flex items-center gap-2">
                      <Cpu className="h-4 w-4" />
                      Poly Count: {formatNumber(model.polyCount || 0)}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Dimensions</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Ruler className="h-4 w-4" />
                      <span>W: {model.dimensions?.width || 0}cm</span>
                      <span>H: {model.dimensions?.height || 0}cm</span>
                      <span>D: {model.dimensions?.depth || 0}cm</span>
                    </div>
                  </div>
                </div>
              </div>

              {model.materials && model.materials.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Materials</h3>
                  <div className="flex flex-wrap gap-2">
                    {model.materials.map((material, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 rounded text-sm text-gray-600"
                      >
                        {material}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <ReviewSection reviews={reviews} />

        {/* Download Dialog */}
        <DownloadDialog
          isOpen={showDownloadDialog}
          onClose={() => setShowDownloadDialog(false)}
          onDownload={handleDownload}
          hasOptimizedVersion={model.optimizedVersion !== undefined}
          originalPolyCount={model.polyCount || 0}
          optimizedPolyCount={model.optimizedVersion?.polyCount}
        />
      </div>
    </div>
  );
}

export default ModelDetailPage;