
export type Category = 'wedding' | 'documentary' | 'daily';

export interface Photo {
  id: string;
  url: string;
  thumbnail: string;
  title?: string;
  description?: string;
  aspectRatio: 'portrait' | 'landscape' | 'square';
  category: Category;
}

export interface ExifData {
  camera: string;
  lens: string;
  iso: string;
  aperture: string;
  shutterSpeed: string;
}

export interface AIAnalysisResult {
  title: string;
  moodDescription: string;
  estimatedExif: ExifData;
  colorPalette: string[];
}

export type View = Category | 'curator' | 'about';

export type NavItem = {
  id: View;
  label: string;
  labelZh: string;
};
