import { useState, useDebugValue } from "react";

function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);

  useDebugValue(count > 5 ? "Alto" : "Baixo");

  return [count, () => setCount((c) => c + 1)] as const;
}

/** Mesmo hook, sem useDebugValue — no DevTools não aparece label. */
function useCounterSemDebug(initial = 0) {
  const [count, setCount] = useState(initial);
  return [count, () => setCount((c) => c + 1)] as const;
}

/**
 * useDebugValue - Exibe um label no React DevTools para custom hooks.
 * Abra o DevTools e inspecione o componente para ver o valor.
 */
export function UseDebugValueExample() {
  const [count, increment] = useCounter(0);
  const [countSemDebug, incrementSemDebug] = useCounterSemDebug(0);

  return (
    <div className="example">
      <h2>useDebugValue</h2>
      <p>
        Abra o React DevTools e inspecione este componente. O hook useCounter
        mostra um valor de debug.
      </p>

      <section className="example-block">
        <h3>Com useDebugValue</h3>
        <p>
          Contador: <strong>{count}</strong> (mostra "Alto" ou "Baixo" no
          DevTools)
        </p>
        <button onClick={increment}>+1</button>
      </section>

      <section className="example-block">
        <h3>Sem useDebugValue</h3>
        <p>
          Contador: <strong>{countSemDebug}</strong> (no DevTools não aparece
          label)
        </p>
        <button onClick={incrementSemDebug}>+1</button>
      </section>
    </div>
  );
}
