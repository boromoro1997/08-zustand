import css from './NoteList.module.css';
import type { Note } from '../../types/note';
import { deleteNote } from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Link from 'next/link';
interface NoteListProps {
  notes: Note[];
}
export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: () => {
      toast.error('This is an error! Something went wrong , try again!');
    },
  });
  return (
    <ul className={css.list}>
      {notes.map(task => (
        <li key={task.id} className={css.listItem}>
          <h2 className={css.title}>{task.title}</h2>
          <p className={css.content}>{task.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{task.tag}</span>
            <Link className={css.link} href={`/notes/${task.id}`}>
              View details
            </Link>
            <button
              onClick={() => task.id && mutate(task.id)}
              className={css.button}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
