'use client';

import { FiSearch } from 'react-icons/fi';

interface IProps {
  query: string;
  setQuery: (query: string) => void;
}

export function SearchInput({ query, setQuery }: IProps) {
  return (
    <div className="relative border-b-2 border-gray-200 transition-colors focus-within:border-black">
      <input
        type="text"
        name="search"
        id="search"
        className="block w-full border-0 border-b-0 border-transparent bg-transparent py-4 pr-10 pl-0 text-xl font-medium placeholder-gray-400 focus:border-transparent focus:ring-0"
        placeholder="Search products"
        value={query}
        onChange={e => setQuery(e.target.value)}
        autoFocus
      />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 text-gray-400">
        <FiSearch size={24} />
      </div>
    </div>
  );
}
