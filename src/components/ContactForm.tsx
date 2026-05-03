import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/cn';

const ENDPOINT = 'https://formsubmit.co/ajax/eyezz@mail.ru';

const TOPICS = [
  { value: 'remove', label: 'Удалить мои данные' },
  { value: 'error', label: 'Сообщить об ошибке' },
  { value: 'suggest', label: 'Предложить врача' },
  { value: 'other', label: 'Другое' },
];

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;

    const form = e.currentTarget;
    const fd = new FormData(form);

    if (fd.get('_honey')) {
      setStatus('sent');
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: fd.get('name'),
          email: fd.get('email'),
          topic: TOPICS.find(t => t.value === fd.get('topic'))?.label || fd.get('topic'),
          message: fd.get('message'),
          _subject: 'Glaucoma Atlas: обращение',
          _template: 'table',
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      if (json.success !== 'true' && json.success !== true) {
        throw new Error(json.message || 'Не удалось отправить форму');
      }

      setStatus('sent');
      form.reset();
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Неизвестная ошибка');
    }
  }

  return (
    <div>
      <AnimatePresence mode="wait">
        {status === 'sent' ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="border border-ru/40 px-6 py-8"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ru mb-3">
              отправлено
            </p>
            <p className="text-bone leading-relaxed mb-4">
              Ваше обращение получено. Мы ответим в течение 48 часов на указанный email.
            </p>
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone-3 hover:text-bone transition-colors border-b border-edge-mid hover:border-bone pb-0.5"
            >
              отправить ещё
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-7"
            noValidate
          >
            {/* honeypot */}
            <input
              type="text"
              name="_honey"
              tabIndex={-1}
              autoComplete="off"
              className="absolute left-[-9999px] w-px h-px opacity-0"
              aria-hidden="true"
            />

            <Field label="Ваше имя" name="name" required minLength={2} />
            <Field label="Email для ответа" name="email" type="email" required />
            <SelectField label="Тема обращения" name="topic" options={TOPICS} required />
            <TextareaField label="Сообщение" name="message" required minLength={10} maxLength={2000} rows={5} />

            <label className="flex items-start gap-3 text-[12px] text-bone-2 leading-relaxed cursor-pointer">
              <input
                type="checkbox"
                required
                className="mt-1 accent-ru shrink-0"
              />
              <span>
                Я согласен на обработку персональных данных в целях рассмотрения этого обращения.
              </span>
            </label>

            {status === 'error' && (
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-red-400/90">
                ошибка отправки · {errorMsg || 'попробуйте позже'}
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className={cn(
                'font-mono text-[11px] uppercase tracking-[0.25em] px-7 py-3.5 transition-all',
                status === 'sending'
                  ? 'bg-ru/40 text-ink/60 cursor-wait'
                  : 'bg-ru text-ink hover:bg-bone'
              )}
            >
              {status === 'sending' ? 'отправка…' : 'отправить'}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({ label, name, type = 'text', required, minLength }: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  minLength?: number;
}) {
  return (
    <div>
      <label htmlFor={name} className="block font-mono text-[10px] uppercase tracking-[0.25em] text-bone-3 mb-2">
        {label}{required && <span className="text-bone-2 ml-1">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        minLength={minLength}
        className="w-full bg-transparent border-0 border-b border-edge-mid focus:border-ru outline-none py-2.5 text-bone text-[15px] transition-colors placeholder:text-bone-3/50"
      />
    </div>
  );
}

function SelectField({ label, name, options, required }: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block font-mono text-[10px] uppercase tracking-[0.25em] text-bone-3 mb-2">
        {label}{required && <span className="text-bone-2 ml-1">*</span>}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        defaultValue=""
        className="w-full bg-transparent border-0 border-b border-edge-mid focus:border-ru outline-none py-2.5 text-bone text-[15px] transition-colors cursor-pointer"
      >
        <option value="" disabled className="bg-ink-2">— выберите —</option>
        {options.map(o => (
          <option key={o.value} value={o.value} className="bg-ink-2">{o.label}</option>
        ))}
      </select>
    </div>
  );
}

function TextareaField({ label, name, required, minLength, maxLength, rows }: {
  label: string;
  name: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  rows?: number;
}) {
  return (
    <div>
      <label htmlFor={name} className="block font-mono text-[10px] uppercase tracking-[0.25em] text-bone-3 mb-2">
        {label}{required && <span className="text-bone-2 ml-1">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        rows={rows}
        className="w-full bg-transparent border-0 border-b border-edge-mid focus:border-ru outline-none py-2.5 text-bone text-[15px] transition-colors resize-none placeholder:text-bone-3/50"
      />
    </div>
  );
}
