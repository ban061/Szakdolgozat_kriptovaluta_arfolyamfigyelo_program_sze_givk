import { createWithEqualityFn } from "zustand/traditional";

interface DataState {
  asset: any;
  setAsset: (asset: any) => void;

  cryptoList: any[];
  setCryptoList: (cryptoList: any[]) => void;
}

const useDataStore = createWithEqualityFn<DataState>()((set, get) => ({
  asset: null,
  setAsset: (asset) => {
    set({ asset });
  },

  cryptoList: [],
  setCryptoList: (cryptoList) => {
    set({ cryptoList });
  },
}));

export default useDataStore;
