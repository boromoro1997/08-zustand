import css from './SearchBox.module.css';
interface SearchBoxProps {
  searchQuery: string;
  onSearch: (querry: string) => void;
}

export default function SearchBox({ searchQuery, onSearch }: SearchBoxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={searchQuery}
      onChange={handleChange}
    />
  );
}
