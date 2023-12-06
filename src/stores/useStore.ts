import { createWithEqualityFn } from "zustand/traditional";

export enum Tabs {
  home,
  predict,
  news,
}

interface State {
  selectedTab: Tabs;
  setSelectedTab: (selectedTab: Tabs) => void;

  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const useStore = createWithEqualityFn<State>()((set) => ({
  selectedTab: Tabs.home,
  setSelectedTab: (selectedTab) => {
    set({ selectedTab });
  },

  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn: boolean) => {
    set({ isLoggedIn });
  },
}));

export default useStore;
