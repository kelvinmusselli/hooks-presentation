import { useSyncExternalStore } from "react";

const subscribe = (callback: () => void) => {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
};

const getSnapshot = () => {
  return navigator.onLine;
};

const getServerSnapshot = () => {
  return true;
};

/**
 * useSyncExternalStore - Inscreve em uma store externa (ex: window, subscription).
 * Garante consistência com SSR e evita tearing em concorrência.
 */
export const UseSyncExternalStoreExample = () => {
  const isOnline = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  return (
    <div className="example">
      <h2>useSyncExternalStore</h2>
      <p>
        Estado da rede (store externa: <code>navigator.onLine</code>):
      </p>
      <p>
        <strong className={isOnline ? "online" : "offline"}>
          {isOnline ? "Online" : "Offline"}
        </strong>
      </p>
      <p className="small">Desligue a rede para ver mudar.</p>
    </div>
  );
};
