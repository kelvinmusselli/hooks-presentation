/**
 * API fake: JSONPlaceholder (https://jsonplaceholder.typicode.com)
 */

export const API_BASE = 'https://jsonplaceholder.typicode.com';

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address?: {
    street: string;
    city: string;
    zipcode: string;
  };
};

export type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export async function fetchPosts(): Promise<Post[]> {
  const res = await fetch(`${API_BASE}/posts`);
  if (!res.ok) throw new Error('Falha ao buscar posts');
  return res.json();
}

/** Busca posts na API: sem query retorna os primeiros; com query usa o filtro ?title= da API. */
export async function searchPosts(query: string, signal?: AbortSignal): Promise<Post[]> {
  const q = query.trim();
  const url = q
    ? `${API_BASE}/posts?title=${encodeURIComponent(q)}`
    : `${API_BASE}/posts`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error('Falha ao buscar posts');
  const data: Post[] = await res.json();
  return q ? data : data.slice(0, 20);
}

export async function fetchPost(id: number): Promise<Post> {
  const res = await fetch(`${API_BASE}/posts/${id}`);
  if (!res.ok) throw new Error('Falha ao buscar post');
  return res.json();
}

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch(`${API_BASE}/users`);
  if (!res.ok) throw new Error('Falha ao buscar usuários');
  return res.json();
}

export async function fetchUser(id: number): Promise<User> {
  const res = await fetch(`${API_BASE}/users/${id}`);
  if (!res.ok) throw new Error('Falha ao buscar usuário');
  return res.json();
}

export async function fetchComments(postId?: number): Promise<Comment[]> {
  const url = postId ? `${API_BASE}/comments?postId=${postId}` : `${API_BASE}/comments`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Falha ao buscar comentários');
  return res.json();
}
