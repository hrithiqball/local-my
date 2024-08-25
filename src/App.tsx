import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { Button } from './components/ui/button';
import { Loader2 } from 'lucide-react';

function App() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div className="bg-red-400">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="bg-red-300">Vite + React</h1>
      <div className="card">
        <Button onClick={() => setLoading(!loading)}>load</Button>
        <Button disabled={loading} onClick={() => setCount(count => count + 1)}>
          {loading && <Loader2 className="mr-1 size-4 animate-spin" />}
          count is {count}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
