import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';
import fetchNotes from '@/lib/api';
import { Tag } from '@/lib/constants';
type Props = {
  params: Promise<{ slug: Tag[] }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const note = slug[0];
  return {
    title: `Notes by filter ${note}`,
    description: `Notes fit to the filter ${note}`,
    openGraph: {
      title: `Notes by filter ${note}`,
      description: `Notes fit to the filter ${note}`,
      url: `https://08-zustand-olive-ten.vercel.app/notes/filter/${note}`,
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
}

const Notes = async ({ params }: Props) => {
  const { slug } = await params;
  const tag = slug[0] === 'All' ? undefined : slug[0];

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['notes', { search: '', page: 1, tag }],
    queryFn: () => fetchNotes(1, '', tag),
  });
  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient tag={tag} />
      </HydrationBoundary>
    </div>
  );
};

export default Notes;
