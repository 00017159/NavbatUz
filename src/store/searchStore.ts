import { create } from 'zustand';
import { Doctor, Specialty } from '../types/doctor';

interface SearchState {
  query: string;
  selectedSpecialty: Specialty | null;
  results: Doctor[];
  isSearching: boolean;
  page: number;
  hasMore: boolean;
  setQuery: (query: string) => void;
  setSpecialty: (specialty: Specialty | null) => void;
  setResults: (results: Doctor[], hasMore: boolean) => void;
  appendResults: (results: Doctor[], hasMore: boolean) => void;
  setSearching: (isSearching: boolean) => void;
  nextPage: () => void;
  reset: () => void;
}

export const useSearchStore = create<SearchState>((set, get) => ({
  query: '',
  selectedSpecialty: null,
  results: [],
  isSearching: false,
  page: 1,
  hasMore: true,

  setQuery: (query) => set({ query, page: 1, results: [] }),
  setSpecialty: (selectedSpecialty) =>
    set({ selectedSpecialty, page: 1, results: [] }),
  setResults: (results, hasMore) => set({ results, hasMore }),
  appendResults: (newResults, hasMore) =>
    set((state) => ({
      results: [...state.results, ...newResults],
      hasMore,
    })),
  setSearching: (isSearching) => set({ isSearching }),
  nextPage: () => set((state) => ({ page: state.page + 1 })),
  reset: () =>
    set({
      query: '',
      selectedSpecialty: null,
      results: [],
      isSearching: false,
      page: 1,
      hasMore: true,
    }),
}));
