import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { authenticate } from '@/lib/auth';
import { cn } from '@/lib/cn';

interface Props {
  onUnlock: () => void;
}

const CODE_LENGTH = 6;

export function PasswordGate({ onUnlock }: Props) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (value.length !== CODE_LENGTH || checking) return;
    setChecking(true);
    const ok = await authenticate(value);
    setChecking(false);
    if (ok) {
      setUnlocking(true);
      setTimeout(onUnlock, 600);
    } else {
      setError(true);
      setValue('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const filtered = e.target.value.replace(/\D/g, '').slice(0, CODE_LENGTH);
    setValue(filtered);
    if (error) setError(false);
    if (filtered.length === CODE_LENGTH) {
      setTimeout(() => {
        const form = inputRef.current?.closest('form');
        form?.requestSubmit();
      }, 100);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: unlocking ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 bg-ink flex items-center justify-center px-6"
    >
      <div className="w-full max-w-md text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-bone-3 mb-12">
          закрытый доступ
        </p>

        <h1 className="font-display font-light text-5xl md:text-6xl text-bone leading-none mb-3">
          Atlas
        </h1>
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-bone-2">
          глаукоматологи · ru + снг
        </p>

        <div className="my-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone-3 mb-6">
            введите код доступа
          </p>

          <form onSubmit={handleSubmit}>
            <motion.div
              animate={error ? { x: [0, -10, 10, -8, 8, -4, 4, 0] } : { x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <input
                ref={inputRef}
                type="password"
                inputMode="numeric"
                pattern="\d*"
                autoComplete="off"
                maxLength={CODE_LENGTH}
                value={value}
                onChange={handleChange}
                className={cn(
                  'w-full bg-transparent border-none outline-none text-center',
                  'font-mono text-3xl tracking-[0.5em] text-bone',
                  'border-b pb-3 transition-colors',
                  error ? 'border-red-500/70' : 'border-edge-mid focus:border-ru'
                )}
                aria-label="Код доступа"
                aria-invalid={error}
              />
            </motion.div>

            <div className="flex justify-center gap-2.5 mt-5" aria-hidden="true">
              {Array.from({ length: CODE_LENGTH }).map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    'w-1.5 h-1.5 rounded-full transition-colors',
                    i < value.length
                      ? error
                        ? 'bg-red-500/70'
                        : 'bg-ru'
                      : 'bg-edge-mid'
                  )}
                />
              ))}
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="font-mono text-[11px] uppercase tracking-[0.25em] text-red-400/80 mt-6"
                >
                  доступ закрыт
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </div>

        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone-3/60">
          справочник для пациентов
        </p>
      </div>
    </motion.div>
  );
}
