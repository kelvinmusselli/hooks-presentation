import { useState, useDeferredValue, useEffect } from "react";
import { searchPosts, type Post } from "../api/dummyjson";

const DEBOUNCE_MS = 400;

/**
 * useDeferredValue + API: digita e busca na API conforme o valor adiado muda.
 * Na primeira vez já carrega dados da API.
 * Debounce evita várias requisições canceladas no Network ao digitar rápido.
 */
export function UseDeferredValueApiExample() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;
    // Carregamento inicial imediato; ao digitar, espera DEBOUNCE_MS para não cancelar várias requests
    const delay = deferredQuery.trim() === "" ? 0 : DEBOUNCE_MS;

    const timeoutId = setTimeout(async () => {
      if (cancelled) return;
      setLoading(true);
      try {
        const data = await searchPosts(deferredQuery, controller.signal);
        if (!cancelled) setPosts(data);
      } catch (err) {
        if ((err as Error).name !== "AbortError") throw err;
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, delay);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [deferredQuery]);

  return (
    <div className="example">
      <h2>useDeferredValue + API</h2>
      <p>
        Digite para buscar na API: o input responde na hora, a busca usa o valor
        adiado.
      </p>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar..."
      />
      {loading && <p className="small">Buscando...</p>}
      <ul className="api-list api-list-sm">
        {posts.map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
      <p className="small">{posts.length} resultado(s)</p>
    </div>
  );
}
