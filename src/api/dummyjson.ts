/**
 * API fake: DummyJSON (https://dummyjson.com)
 */

export const API_BASE = 'https://dummyjson.com';

export type Post = {
  id: number;
  title: string;
  body: string;
  tags?: string[];
  reactions?: { likes: number; dislikes: number };
  views?: number;
  userId: number;
};

type PostsResponse = {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
};

export async function fetchPosts(limit = 20): Promise<Post[]> {
  const res = await fetch(`${API_BASE}/posts?limit=${limit}`);
  if (!res.ok) throw new Error('Falha ao buscar posts');
  const data: PostsResponse = await res.json();
  return data.posts;
}

/** Busca posts na API: sem query retorna os primeiros; com query usa /posts/search?q= */
export async function searchPosts(query: string, signal?: AbortSignal): Promise<Post[]> {
  const q = query.trim();
  const url = q
    ? `${API_BASE}/posts/search?q=${encodeURIComponent(q)}`
    : `${API_BASE}/posts?limit=20`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error('Falha ao buscar posts');
  const data: PostsResponse = await res.json();
  return data.posts;
}

export async function fetchPost(id: number): Promise<Post> {
  const res = await fetch(`${API_BASE}/posts/${id}`);
  if (!res.ok) throw new Error('Falha ao buscar post');
  return res.json();
}
