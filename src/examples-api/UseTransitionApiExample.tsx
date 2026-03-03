import { useState, useTransition } from "react";
import { fetchPosts, fetchUsers } from "../api/jsonPlaceholder";
import type { Post } from "../api/jsonPlaceholder";
import type { User } from "../api/jsonPlaceholder";

/**
 * useTransition + API: troca de aba com dados da API sem travar a UI.
 */
export function UseTransitionApiExample() {
  const [tab, setTab] = useState<"posts" | "users">("posts");
  const [isPending, startTransition] = useTransition();
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const handlePosts = () => {
    startTransition(async () => {
      const data = await fetchPosts();
      setPosts(data.slice(0, 5));
    });
  };

  const handleUsers = () => {
    startTransition(async () => {
      const data = await fetchUsers();
      setUsers(data);
    });
  };

  const switchTab = (t: "posts" | "users") => {
    setTab(t);
    if (t === "posts") {
      setPosts([]);
      handlePosts();
    } else {
      setUsers([]);
      handleUsers();
    }
  };

  console.log(isPending);

  return (
    <div className="example">
      <h2>useTransition + API</h2>
      <p>Troque de aba: a transição mantém a UI responsiva.</p>
      {isPending && <p className="pending">Carregando...</p>}
      <div className="button-group">
        <button onClick={() => switchTab("posts")} disabled={tab === "posts"}>
          Posts
        </button>
        <button onClick={() => switchTab("users")} disabled={tab === "users"}>
          Usuários
        </button>
      </div>
      {tab === "posts" && (
        <ul className="api-list">
          {posts.map((p) => (
            <li key={p.id}>{p.title}</li>
          ))}
        </ul>
      )}
      {tab === "users" && (
        <ul className="api-list">
          {users.map((u) => (
            <li key={u.id}>
              {u.name} — {u.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
