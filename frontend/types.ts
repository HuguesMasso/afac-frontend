
export interface Article {
  id: number;
  title: string;
  date: string;
  imageUrl: string;
  summary: string;
  content: string[]; // Array of paragraphs
}

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}
