
export interface BlogAuthor {
  id: string;
  name: string;
  title: string;
  avatar: string;
  bio?: string;
  certifications?: string[];
  profileLink?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  publishDate: string;
  modifiedDate?: string;
  author: BlogAuthor;
  category?: string;
  tags?: string[];
  readingTime: number;
}
