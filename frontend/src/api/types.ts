/** @format */

export interface IPost {
  _id: string;
  type: string;
  title: string;
  subtitle: string;
  description?: string;
  tags: string[];
  author: string;
  content: {
    html: string;
    text: string;
  };

  heroImage?: {
    storage: string; // ("cloud" us)| "google" ...
    url: string;
    id: string;
  };
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
}
