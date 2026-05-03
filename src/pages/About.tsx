import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ContactForm } from '@/components/ContactForm';
import { data } from '@/data';

export function About() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#contact') {
      const el = document.getElementById('contact');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location]);

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10 py-12 md:py-20">
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-bone-3 mb-6">
        о проекте
      </p>
      <h1 className="font-display font-light text-5xl md:text-6xl text-bone leading-[0.95] mb-12">
        Глаукоматологи<br/>России и СНГ
      </h1>

      <div className="space-y-12 text-bone-2 text-[15px] leading-relaxed max-w-2xl">

        <Section title="Что это">
          <p>
            Некоммерческий справочник врачей-глаукоматологов. Здесь собраны имена специалистов,
            занимающихся диагностикой и хирургией глаукомы в России и странах СНГ. Цель проекта —
            помочь пациентам ориентироваться в географии помощи и быстро находить ссылки
            на профили врачей в открытых источниках.
          </p>
        </Section>

        <Section title="Источники">
          <p>
            Информация собрана из открытых источников: профилей ProDoctorov, сайтов клиник,
            научных публикаций. Все ссылки в карточках ведут на оригинальные страницы в источниках.
            Атлас обновляется вручную; дата последней проверки данных указана в подвале каждой страницы.
          </p>
        </Section>

        <Section title="Дисклеймер">
          <p>
            Это не реклама. Указание имени врача в справочнике не является рекомендацией авторов.
            Информация о специализации, контактах, месте работы может устареть — уточняйте по
            ссылкам и в клиниках напрямую перед обращением. Сайт не заменяет консультацию специалиста.
            Авторы не несут ответственности за решения, принятые на основе этих сведений.
          </p>
        </Section>

        <Section title="Удаление данных">
          <p>
            Если вы врач из этого списка и не согласны с размещением — заполните форму ниже,
            и мы удалим запись по первому запросу в течение 48 часов. Подтверждать причины не нужно.
          </p>
        </Section>

        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone-3 pt-4 border-t border-edge-soft tabular-nums">
          обновлено · {data.meta.generated}
        </div>
      </div>

      {/* Форма */}
      <div id="contact" className="mt-24 pt-16 border-t border-edge-soft scroll-mt-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-bone-3 mb-4">
          обратная связь
        </p>
        <h2 className="font-display font-light text-3xl md:text-4xl text-bone leading-tight mb-12">
          Написать авторам
        </h2>
        <ContactForm />
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone-3 mb-3">
        {title}
      </h2>
      <div className="text-bone-2 leading-relaxed">
        {children}
      </div>
    </section>
  );
}
