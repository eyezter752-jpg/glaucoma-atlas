import { Link } from 'react-router-dom';
import { data } from '@/data';

export function Footer() {
  return (
    <footer className="border-t border-edge-soft mt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Колонка 1: дисклеймер */}
        <div className="max-w-md">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone-3 mb-2">
            дисклеймер
          </p>
          <p className="text-[12.5px] text-bone-2 leading-relaxed">
            Не реклама. Не медицинский совет. Источник данных — открытые профили ProDoctorov и сайты клиник. Информация может устареть.
          </p>
        </div>

        {/* Колонка 2: ссылки */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone-3 mb-3">
            навигация
          </p>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-[13px] text-bone-2 hover:text-bone transition-colors">
                карта
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-[13px] text-bone-2 hover:text-bone transition-colors">
                о проекте
              </Link>
            </li>
            <li>
              <Link to="/about#contact" className="text-[13px] text-bone-2 hover:text-bone transition-colors">
                удалить мои данные
              </Link>
            </li>
          </ul>
        </div>

        {/* Колонка 3: дата */}
        <div className="md:text-right">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone-3 mb-2">
            обновлено
          </p>
          <p className="font-mono text-[13px] text-bone-2 tabular-nums">
            {data.meta.generated}
          </p>
        </div>
      </div>
    </footer>
  );
}
