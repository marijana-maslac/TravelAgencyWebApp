"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  onSearch: (search: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search trips by name..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
