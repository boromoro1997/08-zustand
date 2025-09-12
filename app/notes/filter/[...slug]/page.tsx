import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';
import fetchNotes from '@/lib/api';
import { Tag } from '@/lib/constants';
import { Metadata } from 'next';
type Props = {
  params: Promise<{ slug: Tag[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag: Tag | string = slug[0];

  return {
    title: `Notes - ${tag === 'All' ? 'All Tags' : tag}`,
    description: `Browse notes tagged with ${
      tag === 'All' ? 'all tags' : tag
    }. NoteHub allows you to filter and view notes based on specific tags for better organization.`,
    openGraph: {
      title: `Notes - ${tag === 'All' ? 'All Tags' : tag}`,
      description: `Browse notes tagged with ${
        tag === 'All' ? 'all tags' : tag
      }. NoteHub allows you to filter and view notes based on specific tags for better organization.`,
      url: `https://notehub.com/notes/filter/${tag}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `Notes - ${tag === 'All' ? 'All Tags' : tag} | NoteHub`,
        },
      ],
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
