import React, { Suspense } from 'react';
import Scene from './components/Scene';
import UI from './components/UI';

// Loading fallback
const Loader = () => {
  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="font-mono text-xs animate-pulse">INITIALIZING SYSTEM...</div>
    </div>
  );
};

function App() {
  return (
    <div className="relative w-full min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Suspense fallback={<Loader />}>
        <Scene />
        <UI />
      </Suspense>
    </div>
  );
}

export default App;
