import {
  useEffect,
  useInsertionEffect,
  useLayoutEffect,
  useState,
} from "react";

/**
 * useInsertionEffect - Roda antes de todas as mutações do DOM e antes de useLayoutEffect.
 * Pensado para libs CSS-in-JS injetarem estilos. Não use para lógica de negócio.
 */
export function UseInsertionEffectExample() {
  const [color, setColor] = useState("blue");

  console.log("first render");

  useInsertionEffect(() => {
    console.log("insert in DOM");
  }, []);

  useEffect(() => {
    console.log("useEffect");
  }, []);

  useLayoutEffect(() => {
    console.log("useLayoutEffect");
  }, []);

  useInsertionEffect(() => {
    const style = document.createElement("style");
    style.textContent = `.dynamic-insertion { color: ${color}; font-weight: bold; }`;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, [color]);

  return (
    <div className="example">
      <h2>useInsertionEffect</h2>
      <p>
        Injeta um estilo antes de renderizar o componente (exemplo simplificado
        de CSS-in-JS).
      </p>
      <p className="dynamic-insertion">Texto com cor dinâmica: {color}</p>
      <div className="button-group">
        <button onClick={() => setColor("blue")}>Azul</button>
        <button onClick={() => setColor("green")}>Verde</button>
        <button onClick={() => setColor("red")}>Vermelho</button>
      </div>
    </div>
  );
}
