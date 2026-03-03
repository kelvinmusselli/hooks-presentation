# React Hooks – Exemplos

Projeto com exemplos de **todos os hooks do React**, em React + TypeScript + Vite.

## Como rodar

```bash
npm install
npm run dev
```

Depois abra [http://localhost:5173](http://localhost:5173) e use o menu lateral para navegar entre os hooks.

## Hooks incluídos

| Hook                     | Descrição                                        |
| ------------------------ | ------------------------------------------------ |
| **useDebugValue**        | Exibir valor no React DevTools em custom hooks.  |
| **useDeferredValue**     | Valor “adiado” para manter a UI responsiva.      |
| **useTransition**        | Marcar atualização como transição (isPending).   |
| **useSyncExternalStore** | Inscrever em store externa (ex.: status online). |

Cada exemplo está em `src/examples/` com um comentário explicando o hook.

## Scripts

- `npm run dev` – servidor de desenvolvimento
- `npm run build` – build de produção
- `npm run preview` – preview do build
