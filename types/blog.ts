export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string; // Chứa text, thẻ HTML, thẻ <p>, <img> và <iframe> nhúng YouTube
  thumbnail: string;
  author: string;
  created_at: string;
  published: boolean;
}
