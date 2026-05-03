import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { GridBackground } from '@/components/layout/GridBackground';
import { PasswordGate } from '@/components/auth/PasswordGate';
import { RegionSheet } from '@/components/RegionSheet';
import { SelectionProvider } from '@/state/SelectionContext';
import { isAuthenticated } from '@/lib/auth';
import { Home } from '@/pages/Home';

const About = lazy(() => import('@/pages/About').then(m => ({ default: m.About })));

export default function App() {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    setAuthed(isAuthenticated());
  }, []);

  if (authed === null) {
    return <div className="fixed inset-0 bg-ink" />;
  }

  if (!authed) {
    return <PasswordGate onUnlock={() => setAuthed(true)} />;
  }

  return (
    <SelectionProvider>
      <GridBackground />
      <div className="relative min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Suspense fallback={
            <div className="max-w-7xl mx-auto px-6 py-20 font-mono text-[10px] uppercase tracking-[0.3em] text-bone-3">
              загрузка…
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
      <RegionSheet />
    </SelectionProvider>
  );
}
