'use client';
import Link from 'next/link';
import css from './TagsMenu.module.css';
import { useState } from 'react';
import { tags } from '@/lib/constants';
export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={css.menuContainer}>
      <button onClick={() => setIsOpen(!isOpen)} className={css.menuButton}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          {tags.map(tag => (
            <li key={tag} className={css.menuItem}>
              <Link
                onClick={() => setIsOpen(false)}
                className={css.menuLink}
                href={`/notes/filter/${tag}`}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
