import { useState } from "react";
import type { ComponentType } from "react";
import {
  UseDebugValueExample,
  UseDeferredValueExample,
  UseSyncExternalStoreExample,
  UseInsertionEffectExample,
} from "./examples";
import {
  UseDeferredValueApiExample,
  UseTransitionApiExample,
} from "./examples-api";
import "./App.css";

const HOOKS: { id: string; label: string; Component: ComponentType }[] = [
  {
    id: "useDebugValue",
    label: "useDebugValue",
    Component: UseDebugValueExample,
  },
  {
    id: "useDeferredValue",
    label: "useDeferredValue",
    Component: UseDeferredValueExample,
  },

  {
    id: "useSyncExternalStore",
    label: "useSyncExternalStore",
    Component: UseSyncExternalStoreExample,
  },
  {
    id: "useInsertionEffect",
    label: "useInsertionEffect",
    Component: UseInsertionEffectExample,
  },
];

const HOOKS_API: { id: string; label: string; Component: ComponentType }[] = [
  {
    id: "api-useDeferredValue",
    label: "useDeferredValue + API",
    Component: UseDeferredValueApiExample,
  },
  {
    id: "api-useTransition",
    label: "useTransition + API",
    Component: UseTransitionApiExample,
  },
];

type Section = "base" | "api";

function App() {
  const [section, setSection] = useState<Section>("base");
  const [current, setCurrent] = useState(HOOKS[0].id);

  const list = section === "api" ? HOOKS_API : HOOKS;
  const currentId = list.some((h) => h.id === current) ? current : list[0].id;
  const { Component } = list.find((h) => h.id === currentId) ?? list[0];

  const switchSection = (s: Section) => {
    setSection(s);
    setCurrent(s === "api" ? HOOKS_API[0].id : HOOKS[0].id);
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <h1>React Hooks</h1>
        <div className="sidebar-tabs">
          <button
            className={section === "base" ? "active" : ""}
            onClick={() => switchSection("base")}
          >
            Exemplos
          </button>
          <button
            className={section === "api" ? "active" : ""}
            onClick={() => switchSection("api")}
          >
            Com API
          </button>
        </div>
        <nav>
          {list.map(({ id, label }) => (
            <button
              key={id}
              className={currentId === id ? "active" : ""}
              onClick={() => setCurrent(id)}
            >
              {label}
            </button>
          ))}
        </nav>
      </aside>
      <main className="content">
        <Component />
      </main>
    </div>
  );
}

export default App;
