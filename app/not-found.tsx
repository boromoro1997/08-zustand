import Link from 'next/link';
import css from './Home.module.css';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Note Hub',
  description: 'My Personal Note Hub',
  openGraph: {
    title: `Page not found`,
    description: 'The page is missing',
    url: `https://08-zustand-olive-ten.vercel.app/`,
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'logo',
      },
    ],
    type: 'website',
  },
};
const NotFound = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>

      <Link className={css.homeButton} href="/">
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;
