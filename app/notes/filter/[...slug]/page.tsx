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
