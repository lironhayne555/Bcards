import { ReactNode, createContext, useState } from "react";

interface Props {
  children: ReactNode;
}

type SearchContextType = {
  searchValue: string;
  setSearchValue: (value: string) => void;
};

export const SearchContext = createContext<SearchContextType>({
  searchValue: "",
  setSearchValue: () => {},
});

export const SearchProvider = ({ children }: Props) => {
  const [searchValue, setSearchValue] = useState("");

  return <SearchContext.Provider value={{ searchValue, setSearchValue }}>{children}</SearchContext.Provider>;
};