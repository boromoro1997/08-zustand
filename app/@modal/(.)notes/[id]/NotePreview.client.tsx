'use client';

import Modal from '@/components/Modal/Modal';
import css from './NotePreview.module.css';
import { useParams, useRouter } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

const NotePreviewClient = () => {
  const { id } = useParams<{ id: string }>();

  const router = useRouter();
  const back = () => router.back();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <Modal onClose={back}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{note.createdAt}</p>
          <p className={css.tag}>{note.tag}</p>
        </div>
        <button className={css.backBtn} onClick={back}>
          Back
        </button>
      </div>
    </Modal>
  );
};
export default NotePreviewClient;

// const NotePreviewClient = () => {
//   const { id } = useParams<{ id: string }>();

//   const router = useRouter();
//   const back = () => router.back();

//   const {
//     data: note,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ['note', id],
//     queryFn: () => fetchNoteById(id),
//     refetchOnMount: false,
//   });

//   if (isLoading) return <p>Loading, please wait...</p>;

//   if (error || !note) return <p>Something went wrong.</p>;
