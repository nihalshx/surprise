export interface TimelineItem {
  id: number;
  date: string;
  title: string;
  description: string;
  imageSrc?: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  caption: string;
}

export interface LoveNote {
  id: number;
  content: string;
  position: {
    top: string;
    left: string;
  };
  delay: number;
}

export interface StarMessage {
  id: number;
  x: number;
  y: number;
  message: string;
}