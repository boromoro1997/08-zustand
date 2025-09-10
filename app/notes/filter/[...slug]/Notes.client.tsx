'use client';
import { useState } from 'react';
import css from '@/app/notes/filter/[...slug]/NotesPage.module.css';
import fetchNotes from '@/lib/api';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import SearchBox from '@/components/SearchBox/SearchBox';
import { Toaster } from 'react-hot-toast';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import Loader from '@/components/Loader/Loader';
import { useDebouncedCallback } from 'use-debounce';
import { useParams } from 'next/navigation';
import { Tag } from '@/lib/constants';
type NotesClientProps = {
  tag?: Tag;
};
function NotesClient({ tag }: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 500);
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ['notes', { search: searchQuery, page: currentPage, tag }],
    queryFn: () => fetchNotes(currentPage, searchQuery, tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
  const totalPages = data?.totalPages || 0;
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          searchQuerry={searchQuery}
          onSearch={debouncedSearch} /// SUDA DEBAUNCE
        />
        {isSuccess && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      {isSuccess && !isLoading && data.notes.length > 0 && (
        <NoteList notes={data.notes} />
      )}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
      <Toaster />
    </div>
  );
}

export default NotesClient;
