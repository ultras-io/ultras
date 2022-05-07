import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  FunctionComponent,
} from 'react';

interface FilterInterface {
  searchText: string;
}

interface ContextInterface {
  filter: FilterInterface;
  updateFilter(filter: Partial<FilterInterface>): void;
}

interface PropsInterface {
  filter: FilterInterface;
}

export const FilterContext = createContext<ContextInterface>({
  filter: {
    searchText: '',
  },
  updateFilter: (_filter: Partial<FilterInterface>) => {},
});

export const FilterProvider: FunctionComponent<PropsInterface> = ({
  children,
  filter,
}) => {
  const [filterData, setFilterData] = useState<FilterInterface>(filter);
  const updateFilter = useCallback((partialUpdatedFilter: Partial<FilterInterface>) => {
    setFilterData((previousFilter: FilterInterface) => ({
      ...previousFilter,
      ...partialUpdatedFilter,
    }));
  }, []);

  useEffect(() => {
    setFilterData(filter);
  }, [filter]);

  return (
    <FilterContext.Provider value={{ filter: filterData, updateFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

export function useFilter() {
  return useContext(FilterContext);
}
