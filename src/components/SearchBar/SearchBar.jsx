import { useState } from "react";
import toast from "react-hot-toast";

import { FiSearch } from "react-icons/fi";
import css from "./SearchBar.module.css";

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      return toast.error("Fill in this field please");
    }
    onSubmit(query);
    setQuery("");
  };

  const handleChange = (e) => {
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
