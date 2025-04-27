export interface Author {
  id: string;
  name: string;
  imgUrl?: string | null;
}

export interface Blog {
  id: string;
  title: string;
  content: string;
  thumbnail?: string | null;
  userId: string;
  publicationDate: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  author: Author;
}
