import { useState, useDeferredValue, memo } from "react";

/** Simula trabalho pesado para deixar o adiamento do useDeferredValue visível. */
function slowDown(ms: number) {
  const end = performance.now() + ms;
  while (performance.now() < end) {
    // busy wait
  }
}

const SlowList = memo(function SlowList({ text }: { text: string }) {
  slowDown(8); // ~8ms de "trabalho" por render da lista

  const items = Array.from(
    { length: 12000 },
    (_, i) => `${text} - item ${i + 1}`,
  );
  return (
    <ul className="slow-list">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
});

/**
 * useDeferredValue - Adia a atualização de um valor para manter a UI responsiva.
 * O valor "atrasado" pode ficar desatualizado enquanto a UI responde.
 *
 * Input sempre imediato (usa text); lista pesada usa deferredText e memo.
 */
export function UseDeferredValueExample() {
  const [text, setText] = useState("");
  const deferredText = useDeferredValue(text);

  const [withoutDeferredValue, setWithoutDeferredValue] = useState("");

  return (
    <div className="example">
      <h2>useDeferredValue</h2>
      <p>
        Digite rápido: o input atualiza na hora, a lista (pesada) usa o valor
        adiado e demora mais — você deve ver o input fluir e a lista “atrasar”.
      </p>
      {/* Input imediato: controlado por text, não por deferredText */}
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Digite..."
        autoComplete="off"
      />
      <p>Valor imediato: {text || "(vazio)"}</p>
      <p>Valor adiado (lista):</p>
      <SlowList text={deferredText || "(vazio)"} />
      <br />
      <br />
      <br />
      SEM DEFERRED VALUE
      <section className="example-block">
        <input
          value={withoutDeferredValue}
          onChange={(e) => setWithoutDeferredValue(e.target.value)}
          placeholder="Digite sem deferred value..."
          autoComplete="off"
        />
        <p>Valor imediato: {withoutDeferredValue || "(vazio)"}</p>
        <SlowList text={withoutDeferredValue || "(vazio)"} />
      </section>
    </div>
  );
}
