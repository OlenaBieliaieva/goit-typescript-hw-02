import { useState, ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";

import { FiSearch } from "react-icons/fi";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!query.trim()) {
      toast.error("Fill in this field please");
    }
    onSubmit(query);
    setQuery("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };
  return (
    <header className={css.header}>
      <form onSubmit={handleSubmit} className={css.searchForm}>
        <button type="submit" className={css.searchBtn}>
          <FiSearch />
        </button>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          required
          onChange={handleChange}
          className={css.searchInput}
        />
      </form>
    </header>
  );
};

export default SearchBar;
