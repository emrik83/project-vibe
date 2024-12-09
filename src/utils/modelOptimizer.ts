import { Model } from '@/types/model';

export interface OptimizationResult {
  originalFile: File;
  optimizedFile: File;
  originalPolyCount: number;
  optimizedPolyCount: number;
}

export class ModelOptimizer {
  static async optimizeModel(file: File, reductionPercentage: number): Promise<OptimizationResult> {
    // Read the file content
    const arrayBuffer = await file.arrayBuffer();
    const content = new TextDecoder().decode(arrayBuffer);

    // Parse OBJ file
    const lines = content.split('\n');
    const vertices = lines.filter(line => line.startsWith('v '));
    const faces = lines.filter(line => line.startsWith('f '));
    const others = lines.filter(line => !line.startsWith('v ') && !line.startsWith('f '));

    // Calculate reduction
    const originalCount = vertices.length;
    const targetCount = Math.floor(originalCount * (1 - reductionPercentage / 100));
    const reducedVertices = vertices.slice(0, targetCount);

    // Create vertex map for face index updates
    const vertexMap = new Map();
    vertices.forEach((_, index) => {
      if (index < targetCount) {
        vertexMap.set(index + 1, index + 1);
      } else {
        vertexMap.set(index + 1, targetCount);
      }
    });

    // Update face indices
    const updatedFaces = faces.map(face => {
      const parts = face.split(' ');
      const indices = parts.slice(1).map(part => {
        const [vertexIndex] = part.split('/').map(Number);
        return vertexMap.get(vertexIndex) || vertexIndex;
      });
      return `f ${indices.join(' ')}`;
    });

    // Create optimized content
    const optimizedContent = [
      ...reducedVertices,
      ...updatedFaces,
      ...others
    ].join('\n');

    // Create optimized file
    const optimizedBlob = new Blob([optimizedContent], { type: 'model/obj' });
    const fileName = file.name.split('.');
    const extension = fileName.pop();
    const optimizedFileName = `${fileName.join('.')}_optimized.${extension}`;
    const optimizedFile = new File([optimizedBlob], optimizedFileName, { type: file.type });

    return {
      originalFile: file,
      optimizedFile,
      originalPolyCount: originalCount,
      optimizedPolyCount: targetCount
    };
  }

  static async getPolyCount(file: File): Promise<number> {
    const arrayBuffer = await file.arrayBuffer();
    const content = new TextDecoder().decode(arrayBuffer);
    const vertices = content.split('\n').filter(line => line.startsWith('v ')).length;
    return vertices;
  }
}